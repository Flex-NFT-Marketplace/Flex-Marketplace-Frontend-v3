import DropCard from "@/components/DropCard";
import useGetDrops from "@/services/api/flexhaus/social/useGetDrops";
import { IdropDetail } from "@/types/Idrop";
import { useEffect, useState } from "react";

const HighlightDrops = () => {
  const [highLightDrops, setHighLightDrops] = useState<IdropDetail[]>([]);

  const {
    data: _highLightDrops,
    hasNextPage: hasNextHighLightDrops,
    fetchNextPage: fetchNextHighLightDrops,
    isFetching: isFetchingHighLightDrops,
  } = useGetDrops({});

  useEffect(() => {
    let dropsArr: IdropDetail[] = [];
    _highLightDrops?.pages.map((page) => {
      dropsArr = [...dropsArr, ...page.data.items];
    });
    setHighLightDrops(dropsArr);
  }, [_highLightDrops]);

  return (
    <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <p className="text-2xl uppercase text-shadow-white">Highlight drops</p>
        {/* <Link
        className="font-normal text-grays underline cursor-pointer hover:text-white"
      >
        (View all)
      </Link> */}
      </div>
      <div className="flex gap-4 items-center overflow-auto">
        {highLightDrops?.map((drop, index) => {
          return <DropCard key={index} drop={drop} />;
        })}
      </div>
    </div>
  );
};

export default HighlightDrops;
