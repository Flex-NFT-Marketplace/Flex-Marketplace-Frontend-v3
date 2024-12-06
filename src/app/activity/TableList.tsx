import ActionNFT from "@/components/ActionNFT";
import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import FormatTime from "@/components/FormatTime";
import FormatTime2 from "@/components/FormatTime2";
import ImageKit from "@/packages/@ui-kit/Image";
import { useActivityContext } from "@/services/providers/ActivityProvider";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import { ISignature } from "@/types/ISignature";
import { calculateTimeDifferenceShort } from "@/utils/string";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useRef } from "react";

const TableList = () => {
  const { signatures, isLoading, fetchNextPage } = useActivityContext();

  const scrollRef = useRef(null);

  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);
  useEffect(() => {
    setIsLoadingHeader(isLoading);
  }, [isLoading]);

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!isLoading) {
          console.log("fetch next page");

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

  const onNavigateDetail = (signature: ISignature) => {
    onNavigate(
      "/starknet/asset/" +
        signature.nft.nftContract +
        "/" +
        signature.nft.tokenId
    );
  };

  return (
    <div
      className="relative h-full w-full flex-1 overflow-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <div className="sticky left-0 right-0 top-0 z-10 flex items-center border-b border-stroke bg-background px-6 py-4 font-bold uppercase text-grays">
        <div className="flex min-w-[108px] items-center justify-start">
          <p className="">Action</p>
        </div>
        <div className="flex-1">
          <p className="">Item</p>
        </div>

        <div className="flex min-w-[200px] items-center justify-end">
          <p>Price</p>
        </div>
        <div className="flex min-w-[150px] items-center justify-end">
          <p>From</p>
        </div>
        <div className="flex min-w-[150px] items-center justify-end">
          <p>To</p>
        </div>
        <div className="flex min-w-[150px] items-center justify-end">
          <p>Time</p>
        </div>
      </div>
      <div className="py-2">
        {signatures?.map((_, i) => (
          <div
            onClick={() => onNavigateDetail(_)}
            key={i}
            className="flex cursor-pointer items-center px-6 py-1 font-normal uppercase hover:bg-dark-black"
          >
            <div className="flex min-w-[100px] items-center justify-start">
              <ActionNFT status={_?.status} />
            </div>
            <div className="relative flex flex-1 items-center">
              <ImageKit
                src={_?.nft?.image}
                alt=""
                className="ml-2 h-[52px] w-[52px] rounded"
              />

              <p className="ml-4 truncate font-normal ">{_?.nft?.name}</p>
            </div>

            {/* <div className="flex min-w-[100px] items-center justify-end">
              <p>5000</p>
            </div> */}
            <div className="flex min-w-[200px] items-center justify-end">
              <FormatPrice
                className="text-primary"
                price={_?.price}
                currency={_?.currency}
              />
            </div>
            <div className="flex min-w-[150px] items-center justify-end">
              <FormatAddress address={_?.signer} />
            </div>
            <div className="flex min-w-[150px] items-center justify-end">
              <FormatAddress address={_?.buyer_address} />
            </div>
            <div className="flex min-w-[150px] items-center justify-end">
              <FormatTime2 time={_?.updatedAt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableList;
