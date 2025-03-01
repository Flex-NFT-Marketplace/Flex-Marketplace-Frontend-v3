import ImageKit from "@/packages/@ui-kit/Image";
import useGetDrops from "@/services/api/flexhaus/social/useGetDrops";
import { IdropDetail } from "@/types/Idrop";
import { useCallback, useEffect, useRef, useState } from "react";
import RecentDropsImage from "./RecentDropsImage";

const RecentDrops = () => {
  const [recentDrops, setRecentDrops] = useState<IdropDetail[]>([]);

  const {
    data: _recentDrops,
    hasNextPage: hasNextRecentDrops,
    fetchNextPage: fetchNextRecentDrops,
    isFetching: isFetchingRecentDrops,
  } = useGetDrops({
    size: 10,
    filterBy: "ongoing",
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingRecentDrops) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextRecentDrops) {
          fetchNextRecentDrops();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingRecentDrops, hasNextRecentDrops, fetchNextRecentDrops]
  );

  useEffect(() => {
    let dropsArr: IdropDetail[] = [];
    _recentDrops?.pages.map((page) => {
      dropsArr = [...dropsArr, ...page.data.items];
    });

    setRecentDrops(dropsArr);
  }, [_recentDrops]);
  return (
    <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
      <p className="text-2xl uppercase text-shadow-white">Recent drops</p>
      <div className="grid grid-cols-3 gap-x-3 gap-y-8">
        {recentDrops.map((_, index) => {
          return <RecentDropsImage src={_?.collectible?.avatar} />;
        })}

        {recentDrops.length > 0 &&
          recentDrops.map((drop, index) => {
            if (recentDrops.length === index + 1) {
              return (
                <div ref={lastProductElementRef} key={index}>
                  <ImageKit
                    src={drop?.collectible?.avatar}
                    alt=""
                    className="h-full w-full"
                    width={445}
                    height={445}
                  />
                </div>
              );
            } else {
              return (
                <ImageKit
                  src={drop?.collectible?.avatar}
                  alt=""
                  className="h-full w-full"
                  width={445}
                  height={445}
                />
              );
            }
          })}

        {isFetchingRecentDrops &&
          recentDrops.length == 0 &&
          Array.from({ length: 15 }).map((_, index) => (
            <ImageKit
              src={""}
              alt=""
              className="h-full w-full"
              width={445}
              height={445}
            />
          ))}

        {!isFetchingRecentDrops && recentDrops.length == 0 && (
          <p className="text-sm text-gray-500">No recent drops</p>
        )}
      </div>
    </div>
  );
};

export default RecentDrops;
