"use client";
import { ActivityProvider } from "@/services/providers/ActivityProvider";
import TableCard from "./TableCard";
import TableList from "./TableList";
import Filter from "./Filter";

const ActivityPage = () => {
  return (
    <div className="fixed-height-under-header flex flex-col overflow-auto">
      <div className="fixed-height-under-header !mt-0 flex w-full flex-1">
        <Filter />
        <div className="flex flex-1 flex-col">
          {/* <div className="flex h-[52px] w-full items-center justify-between border-b border-stroke px-4">
              <p className="text-xl font-normal">ACTIVITY</p>
            </div> */}
          {/* <TableCard /> */}
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
