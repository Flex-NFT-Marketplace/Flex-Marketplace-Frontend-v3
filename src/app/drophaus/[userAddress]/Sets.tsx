import SetCard from "@/components/SetCard";
import { useSocial } from "@/services/providers/SocialProvider";
import { useCallback, useRef } from "react";

const Sets = () => {
  const { setsByCreator, setsHasNextPage, fetchNextPageSets, isFetchingSets } =
    useSocial();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastSetElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingSets) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && setsHasNextPage) {
          fetchNextPageSets();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingSets, setsHasNextPage, fetchNextPageSets]
  );

  return (
    <div className="w-full mx-auto max-w-[1440px] flex flex-col gap-8 px-5 py-4">
      <div className="grid grid-cols-3 gap-x-3 gap-y-8 max-[1350px]:grid-cols-2 max-xl:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 [@media_(max-width:500px)]:grid-cols-1">
        {setsByCreator.length === 0 && !isFetchingSets && (
          <p className="text-sm text-gray-500 col-span-full">No sets found</p>
        )}

        {setsByCreator.map((set, index) => {
          if (setsByCreator.length === index + 1) {
            return (
              <div ref={lastSetElementRef} key={index}>
                <SetCard set={set} />
              </div>
            );
          }
          return <SetCard key={index} set={set} />;
        })}

        {isFetchingSets && setsByCreator.length === 0 && (
          <p className="text-sm text-gray-500 col-span-full">Loading sets...</p>
        )}
      </div>
    </div>
  );
};

export default Sets;
