"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useCollectionContext } from "@/services/providers/CollectionProvider";
import ImageDemo from "@/assets/banner.webp";
import TrendingTable from "./TrendingTable";
import clsx from "clsx";

enum TabEnum {
  TRENDING = "TRENDING",
  NEW_MINT = "NEW MINTS",
  _24H = "24H",
  _7D = "7D",
  _30D = "30D",
  FAVORITE = "FAVORITES",
  INVENTORY = "INVENTORY",
}

type TabType =
  | TabEnum.TRENDING
  | TabEnum.NEW_MINT
  | TabEnum._24H
  | TabEnum._7D
  | TabEnum._30D
  | TabEnum.FAVORITE
  | TabEnum.INVENTORY;

const Trending = () => {
  const { collectionTrending } = useCollectionContext();
  const [tabActive, setTabActive] = useState<TabType>(TabEnum.TRENDING);

  const styleTab = (tab: TabType) => {
    let active = false;
    if (tabActive == tab) active = true;

    return clsx("text-grays cursor-pointer", {
      "text-primary text-shadow": active,
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-hidden px-20 max-xl:px-5">
      <div className="w-full min-w-[320px] lg:min-w-[950px] pb-4">
        <div className="flex flex-col lg:flex-row items-center justify-around text-3xl lg:text-5xl font-normal text-grays py-4 lg:py-12">
          <div className="flex gap-6 font-bold">
            <div>
              <p
                className={`${styleTab(TabEnum.TRENDING)} hover:text-white transition-all duration-500 ease-in-out select-none`}
                onClick={() => setTabActive(TabEnum.TRENDING)}
              >
                Trending Collections
              </p>
            </div>
            {/* <div>
              <p
                className={styleTab(TabEnum.NEW_MINT)}
                onClick={() => setTabActive(TabEnum.NEW_MINT)}
              >
                NEW MINTS
              </p>
            </div> */}
            {/* <div className="flex gap-2">
              <p
                className={styleTab(TabEnum._24H)}
                onClick={() => setTabActive(TabEnum._24H)}
              >
                24H
              </p>
              <p
                className={styleTab(TabEnum._7D)}
                onClick={() => setTabActive(TabEnum._7D)}
              >
                7D
              </p>
              <p
                className={styleTab(TabEnum._30D)}
                onClick={() => setTabActive(TabEnum._30D)}
              >
                30D
              </p>
            </div> */}
          </div>

          {/* <div className="flex items-center gap-6">
            <div>
              <p>FAVORITES</p>
            </div>
            <div>
              <p>INVENTORY</p>
            </div>
          </div> */}
        </div>
        {tabActive == TabEnum.TRENDING && <TrendingTable />}

        {/* <div className="mt-4 flex justify-end">
          <Pagination />
        </div> */}
      </div>
    </div>
  );
};

export default Trending;
