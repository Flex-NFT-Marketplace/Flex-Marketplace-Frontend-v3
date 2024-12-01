import TableListItemSkeleton from "@/app/(skeletonLoading)/collectionsSkeleton/TableListItemSkeleton";
import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import FormatTime from "@/components/FormatTime";
import FormatTime2 from "@/components/FormatTime2";
import Checkbox from "@/lib/@core/Checkbox";
import ImageKit from "@/packages/@ui-kit/Image";
import { useCollectionDetailContext } from "@/services/providers/CollectionDetailProvider";
import { INft } from "@/types/INft";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const TableList = () => {
  const { nfts, isLoading, fetchNextPage } = useCollectionDetailContext();

  const scrollRef = useRef(null);

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight) {
        // console.log

        ("ssss");
        if (!isLoading) {
          fetchNextPage();
        }
      }
    },
    [isLoading, fetchNextPage]
  );

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = (nft: INft) => {
    onNavigate("/starknet/asset/" + nft.contract_address + "/" + nft.token_id);
  };

  return (
    <div
      className="relative h-full w-full flex-1 overflow-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <div className="sticky left-0 right-0 top-0 z-10 flex min-w-[900px] items-center border-b border-stroke pr-8 py-4 font-normal uppercase text-grays max-md:pr-5">
        <div className="flex-1">
          {/* <Checkbox /> */}
          <p className="ml-7">Item</p>
        </div>

        {/* <div className="flex min-w-[100px] items-center justify-end">
          <p>Rarity</p>
        </div> */}
        <div className="flex min-w-[100px] items-center justify-end">
          <p>Buy Now</p>
        </div>
        <div className="flex min-w-[100px] items-center justify-end">
          <p>Last Sale</p>
        </div>
        <div className="flex min-w-[100px] items-center justify-end">
          <p>Top Bid</p>
        </div>
        <div className="flex min-w-[100px] items-center justify-end">
          <p>Owner</p>
        </div>
        <div className="flex min-w-[100px] items-center justify-end">
          <p>Time</p>
        </div>
      </div>
      <div className="relative min-w-[900px] overflow-auto">
        {nfts?.map((_, i) => (
          <div
            onClick={() => onNavigateDetail(_)}
            key={i}
            className="flex cursor-pointer items-center pr-8 py-1 font-normal uppercase hover:bg-dark-black max-md:pr-5"
          >
            <div className="sticky left-0 flex flex-1 items-center">
              <div className="h-5 w-5">{/* <Checkbox /> */}</div>
              <ImageKit
                src={_?.image}
                alt=""
                className="ml-2 h-[52px] w-[52px]"
              />

              <p className="ml-4  truncate font-normal ">{_?.name}</p>
            </div>

            {/* <div className="flex min-w-[100px] items-center justify-end">
              <p>5000</p>
            </div> */}
            <div className="flex min-w-[100px] items-center justify-end">
              <FormatPrice
                price={_?.signatures?.price}
                currency={_?.signatures?.currency}
              />
            </div>
            <div className="flex min-w-[100px] items-center justify-end">
              <FormatPrice price={0} />
            </div>
            <div className="flex min-w-[100px] items-center justify-end">
              <FormatPrice price={0} />
            </div>
            <div className="flex min-w-[100px] items-center justify-end">
              <FormatAddress />
            </div>
            <div className="flex min-w-[100px] items-center justify-end">
              <FormatTime2 time={_?.signatures?.updatedAt} />
            </div>
          </div>
        ))}
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <TableListItemSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default TableList;
