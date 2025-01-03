"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useNotify } from "@/services/providers/NotifyProvider";
import { CallData, Contract, RpcProvider, uint256 } from "starknet";
import TxHash from "../TxHash";
import { erc721Abi } from "@/constants/erc721";
import Modal from "@/packages/@ui-kit/Modal";
import Button from "@/packages/@ui-kit/Button";
import { IoClose } from "react-icons/io5";
import ImageKit from "@/packages/@ui-kit/Image";
import { IStagingNftResponse } from "@/types/IStagingNft";

interface IStakingPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  nfts: IStagingNftResponse[];
  setNfts: (nfts: IStagingNftResponse[]) => void;
  onReload: () => void;
  numOfStakingNfts: number;
}

const StakingPopup: React.FC<IStakingPopupProps> = (props) => {
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const { address, status, account } = useAccount();
  const { isOpen, toggleModal, nfts, setNfts, onReload, numOfStakingNfts } =
    props;
  const { onShowNotify } = useNotify();

  const [txHash, setTxHash] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const onStake = async () => {
    setIsProcessing(true);

    if (nfts.length == 0) {
      onShowNotify("Please select nft to stake");
      setIsProcessing(false);
      return;
    }

    const tx = await onSignStake(nfts);

    if (!tx) {
      onShowNotify("Staking failed");
      setIsProcessing(false);
      return;
    }

    // for (let i = 0; i < stakeNfts.length; i++) {
    //   if (stakeNfts[i].checked) {
    //     let nft = stakeNfts[i];
    //     let bodyPost: IStaking = {
    //       contract_address: nft.contract_address,
    //       token_id: nft.token_id,
    //       nft: nft._id,
    //       owner_address: address || "",
    //       from: address || "",
    //       to: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
    //       transaction_hash_stake: tx,
    //       status: StakingStatusEnum.STAKED,
    //     };

    //     await _postStakingNFT.mutateAsync(bodyPost);
    //   }
    // }

    await provider.waitForTransaction(tx);

    onShowNotify("Staking successfully");
    onReload();
    toggleModal();
    setIsProcessing(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTxHash("");
    }
    setIsProcessing(false);
  }, [isOpen]);

  const checkApprovalCollection = async (
    contractAddress: string,
    accountAddress: string
  ) => {
    try {
      const nftContract = new Contract(erc721Abi, contractAddress, provider);
      const formatAnswer = { isApproved: "string" };

      const resERC721 = await nftContract.isApprovedForAll(
        accountAddress,
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
        { parseResponse: true, formatResponse: formatAnswer }
      );

      if (resERC721.isApproved === "1") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const onSignStake = async (nfts: IStagingNftResponse[]) => {
    try {
      if (status == "disconnected" || !account) {
        onShowNotify("Please connect your wallet");
        return;
      }

      const contractNotApproved: string[] = [];
      let messageDataApprove = [];

      for (let i = 0; i < nfts.length; i++) {
        const approved = await checkApprovalCollection(
          nfts[i].nftData.nftContract,
          address || ""
        );

        if (
          !approved &&
          !contractNotApproved.includes(nfts[i].nftData.nftContract)
        ) {
          contractNotApproved.push(nfts[i].nftData.nftContract);

          messageDataApprove.push({
            contractAddress: nfts[i].nftData.nftContract,
            entrypoint: "setApprovalForAll",
            calldata: CallData.compile({
              operator: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
              approved: true,
            }),
          });
        }
      }

      nfts.forEach((nft) => {
        messageDataApprove.push({
          contractAddress:
            process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
          entrypoint: "stakeNFT",
          calldata: CallData.compile({
            collection: nft.nftData.nftContract,
            tokenId: uint256.bnToUint256(nft.nftData.tokenId),
          }),
        });
      });

      const res = await account.execute(messageDataApprove);
      setTxHash(res.transaction_hash);
      return res.transaction_hash;
    } catch (error) {
      return false;
    }
  };

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <p className="text-2xl font-bold uppercase">stake Nft</p>
            <p className="text-grays">
              Current staking NFT: {numOfStakingNfts}
            </p>
          </div>
          <Button icon={<IoClose />} variant="icon" onClick={toggleModal} />
        </div>

        <div className="w-full">
          <div className="border-b border-stroke pb-2">
            <p className="font-bold uppercase">List of Staking Nft</p>
          </div>

          <div className="mt-2 flex max-h-[250px] flex-col gap-2 overflow-auto">
            {nfts &&
              nfts.map((_, index) => {
                return (
                  <div
                    className=" flex w-full items-center hover:bg-dark-black"
                    key={index}
                    // onMouseDown={() => {
                    //   onChecked(_, !_.checked);
                    // }}
                  >
                    <div className="relative flex flex-1 items-center justify-start">
                      <ImageKit
                        alt=""
                        src={_?.nftData?.image}
                        className="ml-2 h-[40px] w-[40px]"
                      />

                      <p className="ml-4 truncate font-bold ">
                        {_?.nftData?.name}
                      </p>
                    </div>

                    {/* <Checkbox isChecked={_.checked} onChange={() => {}} /> */}
                  </div>
                );
              })}

            {nfts?.length == 0 && (
              <div className="pt-6">
                <p className="text-sell">You dont have nft to stake</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          {/* <div className="flex justify-between">
            <p className="font-bold">Staking #:</p>
            <p>1 + 5</p>
          </div>

          <div className="mt-2 flex justify-between">
            <p className="font-bold">Point per hour:</p>
            <p>1 + 5</p>
          </div> */}
        </div>
        {txHash && (
          <div className="flex items-center justify-between">
            <p>TxHash:</p>
            <TxHash txHash={txHash} />
          </div>
        )}

        <div className="flex w-full gap-4">
          <Button
            title="Stake"
            className="w-full"
            onClick={onStake}
            loading={isProcessing}
          />
        </div>
      </div>
    </Modal>
  );
};

export default StakingPopup;
