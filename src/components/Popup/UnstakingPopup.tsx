"use client";

import Checkbox from "@/lib/@core/Checkbox";
import React, { useEffect, useState } from "react";
import { usePutUnStakeNFT } from "@/services/api/usePutUnStakeNFT";
import { useAccount } from "@starknet-react/core";
import { useNotify } from "@/services/providers/NotifyProvider";
import { CallData, RpcProvider, uint256 } from "starknet";
import TxHash from "../TxHash";
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
}
const UnStakingPopup: React.FC<IStakingPopupProps> = (props) => {
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const { address, status, account } = useAccount();
  const { isOpen, toggleModal, nfts, setNfts, onReload } = props;
  const { onShowNotify } = useNotify();

  const [txHash, setTxHash] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const onUnstake = async () => {
    setIsProcessing(true);

    if (nfts.length == 0) {
      onShowNotify("Please select nft to unstake");
      setIsProcessing(false);
      return;
    }

    const tx = await onSignUnstake(nfts);

    if (!tx) {
      onShowNotify("Unstake failed");
      setIsProcessing(false);
      return;
    }

    // for (let i = 0; i < stakeNfts.length; i++) {
    //   if (stakeNfts[i].checked) {
    //     let nft = stakeNfts[i];

    //     let bodyPost = {
    //       owner_address: address || "",
    //       nft_id: nft._id,
    //       tx_hash: tx,
    //     };

    //     await _putUnstakingNFT.mutateAsync(bodyPost);
    //   }
    // }

    await provider.waitForTransaction(tx);

    onShowNotify("Unstake successfully");
    onReload();
    toggleModal();
    setIsProcessing(false);
  };

  const onSignUnstake = async (nfts: IStagingNftResponse[]) => {
    try {
      if (status == "disconnected" || !account) {
        onShowNotify("Please connect your wallet");
        return;
      }

      let messageData: any[] = [];

      nfts.forEach((nft) => {
        messageData.push({
          contractAddress:
            process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
          entrypoint: "unstakeNFT",
          calldata: CallData.compile({
            collection: nft.nftData.nftContract,
            tokenId: uint256.bnToUint256(nft.nftData.tokenId),
          }),
        });
      });

      const res = await account.execute(messageData);
      setTxHash(res.transaction_hash);
      return res.transaction_hash;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTxHash("");
    }
    setIsProcessing(false);
  }, [isOpen]);

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Unstake NFT </p>
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

        <Button
          title="Unstake"
          className="w-full"
          onClick={onUnstake}
          loading={isProcessing}
        />
      </div>
    </Modal>
  );
};

export default UnStakingPopup;
