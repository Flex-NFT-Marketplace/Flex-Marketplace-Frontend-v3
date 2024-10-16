"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "@/app/(skeletonLoading)/share/Skeleton";

const BannerItemSkeleton: React.FC = () => {
  return (
    <div className="relative h-[168px] w-[326px] flex-shrink-0 rounded border-white">
      <Skeleton className="absolute inset-0 h-full w-full rounded object-cover" />
      <div className="absolute inset-0 rounded bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="absolute inset-0 flex h-full flex-col justify-between p-4">
        <div className="h-8 w-8 rounded-full">
          <Skeleton className="h-full w-full rounded-full object-cover" />
        </div>

        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
};

const BannerSkeleton: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed-height-under-header relative w-full">
      <Skeleton className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      <div className="absolute bottom-20 left-0 right-0 ">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-end gap-8 px-20 max-md:px-5">
          <div className="flex items-end justify-between gap-y-8 max-md:flex-wrap">
            <div className="flex flex-col max-md:w-full">
              <div className="mb-4 flex gap-4 text-2xl font-normal">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-12 w-full max-w-[300px]" />
              <Skeleton className="mt-6 h-10 w-[200px]" />
            </div>
            <div className="flex flex-col items-end gap-9 max-md:items-start">
              <div className="flex gap-14">
                <div className="flex flex-col items-center gap-y-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex flex-col items-center gap-y-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="flex gap-x-6 max-sm:flex-col max-sm:gap-y-2">
                <div className="flex gap-1 font-normal">
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-1 font-normal">
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-1 font-normal">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full scroll-m-3 gap-6 overflow-visible overflow-x-auto pb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <BannerItemSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
