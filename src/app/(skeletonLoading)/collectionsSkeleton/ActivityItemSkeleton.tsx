import React from "react";
import Skeleton from "../share/Skeleton";

const ActivityItemSkeleton: React.FC = () => {
  return (
    <div className="flex cursor-pointer pl-4 pr-8 hover:bg-dark-black">
      <Skeleton className="h-[72px] w-[72px]" />

      <div className="ml-2 flex flex-col justify-between">
        <div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

export default ActivityItemSkeleton;
