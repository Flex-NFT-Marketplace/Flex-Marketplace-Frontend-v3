import CardNFTSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const Inventory = () => {
  const { address } = useParams();
  const { address: accountAddress } = useAccount();
  const { loading, nftsOwner, fetchNextPageInventory } = useAccountContext();

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (!loading) {
          fetchNextPageInventory();
        }
      }
    },
    [loading, fetchNextPageInventory]
  );

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    console.log(nftsOwner);
  }, [nftsOwner]);

  return (
    <div id="scroll-container" className="p-4  overflow-auto">
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
            onReload={() => {}}
            bestAsk={nft?.orderData?.bestAsk}
            collection={nft?.nftData.nftCollection}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
