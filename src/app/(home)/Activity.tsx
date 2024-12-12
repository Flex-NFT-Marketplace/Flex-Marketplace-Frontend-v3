"use client";
import {
  SortStatusEnum,
  useActivityContext,
} from "@/services/providers/ActivityProvider";
import TableList from "./TableList";
import { useRouter } from "next/navigation";

interface IFilterType {
  name: string;
  sortType: SortStatusEnum;
}

const Activity = () => {
  const router = useRouter();
  const filter: IFilterType[] = [
    {
      name: "ALL",
      sortType: SortStatusEnum.ALL,
    },
    {
      name: "Sales",
      sortType: SortStatusEnum.SOLD,
    },
    {
      name: "Bids",
      sortType: SortStatusEnum.BID,
    },
    {
      name: "listings",
      sortType: SortStatusEnum.LISTING,
    },
  ];

  const { setSortStatus, sortStatus } = useActivityContext();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/activity");
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] pb-20 px-20 max-xl:px-5 font-bold">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <p className="text-2xl uppercase text-shadow-white">
            Recent Activities
          </p>
          <p
            onClick={onNavigateDetail}
            className="font-normal text-grays underline cursor-pointer hover:text-white"
          >
            (View all)
          </p>
        </div>
        <div className="flex items-center gap-6 max-md:hidden">
          {filter.map((item: IFilterType, index: number) => {
            return (
              <p
                key={index}
                onClick={() => setSortStatus(item.sortType)}
                className={`uppercase cursor-pointer hover:text-white ${sortStatus == item.sortType ? "text-shadow-white" : "text-grays"}`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
      <TableList />
    </div>
  );
};

export default Activity;
