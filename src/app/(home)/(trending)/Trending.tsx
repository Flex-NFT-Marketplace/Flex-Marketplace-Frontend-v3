"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useCollectionContext } from "@/services/providers/CollectionProvider";
import ImageDemo from "@/assets/banner.webp";
import TrendingTable from "./TrendingTable";
import clsx from "clsx";
import Input from "@/packages/@ui-kit/Input";
import { IoMdSearch } from "react-icons/io";

enum TabEnum {
  _24H = "24H",
  _7D = "7D",
  _30D = "30D",
  FAVORITE = "FAVORITES",
}

type TabType = TabEnum._24H | TabEnum._7D | TabEnum._30D | TabEnum.FAVORITE;

const Trending = () => {
  const [tabActive, setTabActive] = useState<TabType>(TabEnum._24H);

  const styleTab = (tab: TabType) => {
    let active = false;
    if (tabActive == tab) active = true;

    return clsx("text-grays cursor-pointer", {
      "text-primary text-shadow": active,
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-hidden px-20 max-xl:px-5 font-bold">
      <div className="w-full min-w-[320px] lg:min-w-[950px] pb-4">
        <div className="flex items-center gap-10 mb-7">
          <div className="flex gap-6">
            {/* <p className="uppercase text-shadow text-primary">Trendings</p> */}
            <div className="flex items-center gap-4">
              <p className="text-2xl uppercase text-shadow-white">
                Recent Activities
              </p>
            </div>
            {/* <div className="flex gap-2">
              <p
                className={`cursor-pointer ${tabActive == TabEnum._24H ? "text-primary text-shadow" : "text-grays hover:text-white"}`}
                onClick={() => setTabActive(TabEnum._24H)}
              >
                24H
              </p>
              <p
                className={`cursor-pointer ${tabActive == TabEnum._7D ? "text-primary text-shadow" : "text-grays hover:text-white"}`}
                onClick={() => setTabActive(TabEnum._7D)}
              >
                7D
              </p>
              <p
                className={`cursor-pointer ${tabActive == TabEnum._30D ? "text-primary text-shadow" : "text-grays hover:text-white"}`}
                onClick={() => setTabActive(TabEnum._30D)}
              >
                30D
              </p>
            </div> */}
          </div>
          {/* <div className="flex-1 max-md:hidden">
            <Input
              icon={<IoMdSearch />}
              placeholder="Search by Collection"
              classContainer="!max-w-full w-full"
            />
          </div> */}
          {/* <div className="max-lg:hidden">
            <p
              className={`cursor-pointer uppercase ${tabActive == TabEnum.FAVORITE ? "text-primary text-shadow" : "text-grays hover:text-white"}`}
              onClick={() => setTabActive(TabEnum.FAVORITE)}
            >
              favorites
            </p>
          </div> */}
        </div>
        {tabActive == TabEnum._24H && <TrendingTable />}
      </div>
    </div>
  );
};

export default Trending;
