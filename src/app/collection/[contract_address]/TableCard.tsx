import NftItemSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { useCollectionDetailContext } from "@/services/providers/CollectionDetailProvider";
import { IAttributesCollection } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingNft, IStagingNftResponse } from "@/types/IStagingNft";
import { getShortTraits } from "@/utils/string";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const TableCard = (props: any) => {
  const { isShowFilter, isShowActivity, nfts, isFetching } = props;

  const { traitsActive, setTraitsActive, getBestBid } =
    useCollectionDetailContext();

  const onRemoveFilter = (trait: IAttributesCollection) => {
    const newTraitActive: IAttributesCollection[] = [];
    traitsActive.forEach((item) => {
      if (!(item.trait_type == trait.trait_type && item.value == trait.value))
        newTraitActive.push(item);
    });
    if (!newTraitActive || newTraitActive.length == 0) {
      setTraitsActive([]);
    } else setTraitsActive(newTraitActive);
  };

  // Scroll to the top of the page on reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  return (
    <div className="w-full">
      <div className="flex gap-2 pt-4 px-[0.5rem] flex-wrap">
        {traitsActive?.map((item, index) => {
          return (
            <div
              key={index}
              className="p-2 rounded bg-white/15 hover:bg-white/30 flex items-center gap-2"
            >
              <p>
                {item.trait_type}: {getShortTraits(item.value.toString(), 5)}
              </p>
              <IoClose
                onClick={() => onRemoveFilter(item)}
                className="hover:cursor-pointer"
              />
            </div>
          );
        })}
        {traitsActive?.length > 0 && (
          <div
            onClick={() => setTraitsActive([])}
            className="p-2 cursor-pointer"
          >
            <p className="font-bold text-grays hover:text-white">Clear all</p>
          </div>
        )}
      </div>

      <div
        className={`w-full mb-8 flex h-fit flex-wrap gap-y-[6px] px-[1.45rem] pt-4 max-md:px-[0.5rem] ${isShowFilter || isShowActivity ? "max-sm:w-0 max-sm:px-0" : ""}`}
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
            bestBid={getBestBid(_)}
            onReload={() => {}}
            isShowFilter={isShowFilter}
            isShowActivity={isShowActivity}
          />
        ))}

        {!isFetching && nfts?.length == 0 && <p>No NFT found</p>}

        {isFetching &&
          Array.from({ length: 10 }).map((_, index) => (
            <NftItemSkeleton
              key={index}
              isShowFilter={isShowFilter}
              isShowActivity={isShowActivity}
            />
          ))}
      </div>
    </div>
  );
};

export default TableCard;
