import CardNFT from "@/components/CardNFT";
import { useActivityContext } from "@/services/providers/ActivityProvider";
import { useCallback, useEffect, useRef } from "react";

const TableCard = () => {
  const { signatures, isLoading, fetchNextPage } = useActivityContext();

  const scrollRef = useRef(null);

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!isLoading) {
          // fetchNextPage();
        }
      }
    },
    [isLoading, fetchNextPage],
  );

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer?.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex h-full w-full flex-wrap items-stretch justify-start gap-2 overflow-auto px-8 py-4"
    >
      {signatures?.map((_, index) => (
        <CardNFT
          key={index}
          nft={_.nft}
          bestAsk={_}
          onReload={() => {}}
        />
      ))}
    </div>
  );
};

export default TableCard;
