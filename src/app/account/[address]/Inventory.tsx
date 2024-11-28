import CardNFTSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import {
  INftAccountResponse,
  useGetNftsByOwner1,
} from "@/services/api/account/useGetNftsByOwner";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { INft } from "@/types/INft";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Inventory = () => {
  const { address } = useParams();
  const { address: accountAddress } = useAccount();
  const _getNfts = useGetNftsByOwner1(address.toString());
  const [nfts, setNfts] = useState<INft[]>([]);

  useEffect(() => {
    if (address) {
      getAllNfts();
    }
  }, [address]);

  const getAllNfts = async () => {
    const res = await _getNfts.mutateAsync(address.toString());
    setNfts(res);
  };

  return (
    <div className="p-4 pb-32">
      <div className="flex flex-wrap justify-start">
        {nfts?.length == 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardNFTSkeleton key={index} />
          ))}
        {/* {nfts?.length == 0 && !loading && (
          <p className="text-white">No NFTs found</p>
        )} */}
        {nfts?.map((nft: INft, index) => (
          <CardNFT
            key={index}
            nft={nft}
            isOwner={address == accountAddress}
            onReload={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
