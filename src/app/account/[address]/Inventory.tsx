import CardNFTSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { INft } from "@/types/INft";
import { IStagingNft, IStagingNftResponse } from "@/types/IStagingNft";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Inventory = () => {
  const { address } = useParams();
  const { address: accountAddress } = useAccount();
  const { loading, nftsOwner } = useAccountContext();

  return (
    <div className="p-4 pb-32">
      <div className="flex flex-wrap justify-start">
        {nftsOwner?.length == 0 &&
          loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardNFTSkeleton key={index} />
          ))}
        {nftsOwner?.length == 0 && !loading && (
          <p className="text-white">No NFTs found</p>
        )}
        {nftsOwner?.map((nft: IStagingNftResponse, index) => (
          <CardNFT
            key={index}
            nft={nft.nftData}
            isOwner={address == accountAddress}
            onReload={() => {}}
            bestAsk={nft?.orderData?.bestAsk}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
