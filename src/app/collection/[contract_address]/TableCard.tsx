import NftItemSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { INft } from "@/types/INft";
import { IStagingNft, IStagingNftResponse } from "@/types/IStagingNft";
import { useEffect } from "react";

const TableCard = (props: any) => {
  const { isShowFilter, isShowActivity, nfts, isFetching } = props;

  // Scroll to the top of the page on reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`mb-8 flex h-fit flex-wrap gap-y-[6px] px-[1.45rem] pt-4 max-md:px-[0.5rem] ${isShowFilter || isShowActivity ? "max-sm:w-0 max-sm:px-0" : ""}`}
      style={{
        paddingLeft: isShowFilter ? "0.3rem" : "",
        paddingRight: isShowActivity ? "0.3rem" : "",
      }}
    >
      {nfts?.map((_: IStagingNftResponse, index: number) => (
        <CardNFT
          key={index}
          nft={_.nftData}
          bestAsk={_?.orderData?.bestAsk}
          onReload={() => {}}
          isShowFilter={isShowFilter}
          isShowActivity={isShowActivity}
        />
      ))}
      {isFetching &&
        Array.from({ length: 10 }).map((_, index) => (
          <NftItemSkeleton
            key={index}
            isShowFilter={isShowFilter}
            isShowActivity={isShowActivity}
          />
        ))}
    </div>
  );
};

export default TableCard;
