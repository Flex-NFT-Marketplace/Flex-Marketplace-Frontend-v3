"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "@/app/(skeletonLoading)/share/Skeleton";
import clsx from "clsx";

interface CardNFTProps {
  isShowFilter?: boolean;
  isShowActivity?: boolean;
}

const CardNFTSkeleton: React.FC<CardNFTProps> = ({
  isShowActivity,
  isShowFilter,
}) => {
  const baseClasses =
    "border border-stroke hover:border-white hover:shadow-solid select-none overflow-hidden rounded scale-[0.92] relative flex flex-col transition-all duration-100 ease-in-out mb-[-0.75rem]";

  // Define width classes with improved granularity and consistency
  const widthClasses =
    "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[14.2857%] 2xl:w-[10%]";

  // Separate classes for different states involving filters or activity views
  const filterOrActivityWidthClasses =
    "hidden sm:block sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-[12.5%]";
  const filterAndActivityWidthClasses =
    "hidden sm:block sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/6";

  const classes = clsx(
    baseClasses,
    isShowFilter && isShowActivity
      ? filterAndActivityWidthClasses
      : isShowFilter || isShowActivity
        ? filterOrActivityWidthClasses
        : widthClasses
  );

  return (
    <div className={classes}>
      <div className="cursor-pointer overflow-hidden">
        <Skeleton className={`aspect-square w-full rounded-t transition-all`} />
      </div>

      <div className="relative mt-2 flex flex-col gap-1 px-3 py-2">
        <div className="cursor-pointer">
          <Skeleton className="h-6 w-3/4" />
          {/* <div className="mt-2 h-4">
            <Skeleton className="h-full w-1/2" />
          </div> */}
        </div>
        <div className="mt-2 flex items-center justify-between text-grays">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNFTSkeleton;
