"use client";
import Modal from "@/lib/@core/Modal";
import { useCollectionDetailContext } from "@/services/providers/CollectionDetailProvider";
import CheckSVG from "@/assets/badge-check.svg";
import { useAccount } from "@starknet-react/core";
import FormatAddress from "../FormatAddress";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { strShortAddress } from "@/utils/string";
import Button from "@/lib/@core/Button";
import { INft } from "@/types/INft";
import { useContext, useEffect, useState } from "react";
import useGetNftsByOwner, {
  INftAccountResponse,
} from "@/services/api/account/useGetNftsByOwner";
import { useRouter } from "next/navigation";
import { ISignature } from "@/types/ISignature";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import { CallData, Contract, RpcProvider, cairo } from "starknet";
import { claimABI } from "@/types/abi/claimABI";
import { FaRegShareSquare } from "react-icons/fa";
import TxHash from "../TxHash";
import FormatPrice from "../FormatPrice";
import ImageKit from "@/packages/@ui-kit/Image";
interface IClaimPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const provider = new RpcProvider({
  nodeUrl:
    process.env.STARKNET_NODE_URL ||
    "https://starknet-mainnet.g.alchemy.com/v2/PDWMhHtyi3_RVgU1VbNwTfZ9MscJffDZ",
});

const ClaimPopup: React.FC<IClaimPopupProps> = (props) => {
  const { isOpen, toggleModal } = props;
  const { address, status, account } = useAccount();
  const { profileOwner } = useAccountContext();
  const { collection } = useCollectionDetailContext();

  const [nfts, setNfts] = useState<any[]>([]);
  const _getNfts = useGetNftsByOwner(address as string);
  const [loading, setLoading] = useState(false);
  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);
  const [txHash, setTxHash] = useState("");

  const [isHolder, setIsHolder] = useState(true);

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    setIsLoadingHeader(loading);
  }, [loading]);

  const getNfts = async (address: string) => {
    if (address == "") return;

    try {
      setLoading(true);
      const res = await _getNfts.mutateAsync(address);

      let dreamyNfts: any[] = res.filter(
        (nft) =>
          nft.collection?.contract_address ==
          "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd",
      );

      if (dreamyNfts.length == 0) {
        setIsHolder(false);
      } else {
        setIsHolder(true);
      }

      // check claim
      dreamyNfts.forEach(async (nft) => {
        const res = await checkClaim(nft.nft.token_id);
        nft["claimed"] = res;
      });

      setNfts([...dreamyNfts]);
      setLoading(false);
    } catch (error) {
      // console.log

      error;
      setLoading(false);
    }
  };

  useEffect(() => {
    getNfts(address as string);
  }, [address]);

  const contract_claim =
    "0x020Aa11175274aDF42e8095daF59DBCf760EF16f14294df59A37378015c1Ff00";

  const checkClaim = async (token_id: string) => {
    try {
      const contract = new Contract(
        claimABI,
        "0x020aa11175274adf42e8095daf59dbcf760ef16f14294df59a37378015c1ff00",
        provider,
      );
      const res = await contract.is_claimed_rewards(token_id);
      return res;
    } catch (error) { }
  };

  const onClaim = async () => {
    let nftsClaim = nfts.filter((nft) => !nft.claimed);

    let multiple = nftsClaim.map((nft) => {
      return {
        contractAddress: contract_claim,
        entrypoint: "claim_rewards",
        calldata: CallData.compile({
          _token_id: cairo.uint256(nft.nft.token_id),
        }),
      };
    });

    if (status == "connected") {
      try {
        setLoading(true);
        const result = await account?.execute(multiple);

        if (result?.transaction_hash) {
          setIsClaiming(true);
          setTxHash(result.transaction_hash);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        // console.log

        error;
      }
    } else {
    }
  };

  return (
    <Modal isShowing={isOpen} hide={toggleModal}>
      <div className="flex flex-col gap-6 max-sm:min-w-[30px] max-sm:gap-2 p-4">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-normal uppercase">Claim $STRK</p>
        </div>

        {!isClaiming && (
          <>
            <p className="-mt-6 text-center font-normal text-grays">
              You are required to have Dreamy BoTTy to claim
            </p>
            <div className="flex w-full border border-stroke p-5">
              <ImageKit
                src={collection?.image_url}
                alt=""
                className="h-[92px] w-[92px]"
              />

              <div className="ml-4 flex flex-1 flex-col justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-normal uppercase">Dreamy BoTTy</p>

                  <ImageKit src={CheckSVG} alt="" className="h-4 w-4" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-grays">Owned NFTs:</p>
                    <p className="font-normal">{nfts.length}</p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-normal text-grays">Claimed STRK:</p>
                    <FormatPrice
                      price={nfts.filter((nft) => !nft.claimed).length * 26}
                      currency="0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
                    />
                  </div>
                </div>
              </div>
            </div>

            {nfts.length > 0 && <div className="flex w-[486px] items-center justify-center gap-2 overflow-x-auto">
              {nfts?.map((_, i) => (
                <div
                  className="flex flex-shrink-0 flex-col items-center gap-2"
                  key={i}
                >
                  <div className="relative">
                    {_.claimed && (
                      <>
                        <div className="absolute inset-0 bg-black/70"></div>
                        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-white">
                          Claimed
                        </p>
                      </>
                    )}

                    <ImageKit
                      src={_.nft.image_url}
                      alt=""
                      className="h-[84px] w-[84px]"
                    />
                  </div>

                  <p className="font-normal">#{_.nft.token_id}</p>
                </div>
              ))}
            </div>}

            <div className="text-center">
              <p className=" text-center font-normal text-grays">
                Each NFT can be only claimed once<br></br> The $STRK will be
                sent to your holding NFT wallet
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                title="Cancel"
                mode="outline"
                className="w-full"
                onClick={toggleModal}
              />
              {isHolder && (
                <Button
                  title="Claim Now"
                  className="w-full"
                  isLoading={loading}
                  active={nfts.filter((nft) => !nft.claimed).length > 0}
                  onClick={() => {
                    onClaim();
                  }}
                />
              )}
            </div>
          </>
        )}

        {isClaiming && (
          <>
            <p className="text-center font-normal text-grays">
              $STRK will be sent to your holding NFT wallet
            </p>

            <div className="flex items-center justify-between">
              <p>TxHash:</p>
              <TxHash txHash={txHash} />
            </div>
            <div className="flex gap-2">
              <Button title="Done" className="w-full" onClick={toggleModal} />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ClaimPopup;
