import Skeleton from "../share/Skeleton";

const TableListItemSkeleton = () => {
  return (
    <div className="flex cursor-pointer items-center px-8 py-1 font-normal uppercase hover:bg-dark-black max-md:px-5">
      <div className="sticky left-0 flex flex-1 items-center">
        <div className="h-5 w-5">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="ml-2 h-[52px] w-[52px]" />
        <Skeleton className="ml-4 h-6 w-24" />
      </div>

      <div className="flex min-w-[100px] items-center justify-end">
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex min-w-[100px] items-center justify-end">
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex min-w-[100px] items-center justify-end">
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex min-w-[100px] items-center justify-end">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex min-w-[100px] items-center justify-end">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
};

export default TableListItemSkeleton;
