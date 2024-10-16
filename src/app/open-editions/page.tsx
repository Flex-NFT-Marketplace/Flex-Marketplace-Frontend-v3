"use client";

import FooterImage from "@/assets/footer.svg";
import { useEffect, useState } from "react";
import OpenEditionsCard from "./Card";
import { useGetOpenEditions } from "@/services/api/useGetOpenEditions";
import ImageKit from "@/packages/@ui-kit/Image";

enum TabEnum {
  LIVE = "LIVE",
  UPCOMING = "UPCOMING",
  PAST = "PAST",
}

type TabType = TabEnum.LIVE | TabEnum.UPCOMING | TabEnum.PAST;

const tabs = [TabEnum.LIVE, TabEnum.UPCOMING, TabEnum.PAST];

const OpenEditions = () => {
  const [tabActive, setTabActive] = useState<TabType>(TabEnum.LIVE);
  const [openEditions, setOpenEditions] = useState([]);
  const [stateActive, setStateActive] = useState("LiveNow");

  const { data } = useGetOpenEditions(stateActive);

  useEffect(() => {
    const state =
      tabActive == TabEnum.LIVE
        ? "LiveNow"
        : tabActive == TabEnum.UPCOMING
          ? "UpComming"
          : "Ended";
    setStateActive(state);
  }, [tabActive]);

  useEffect(() => {
    setOpenEditions(data?.items);
  }, [data]);

  return (
    <div className="fixed-height-under-header relative flex flex-col overflow-auto">
      <div className="absolute left-0 right-0 top-[110px] -z-10">
        <ImageKit
          alt=""
          src={FooterImage}
          className="h-[360px] w-full object-cover"
        />
      </div>

      <div className="mx-auto mb-10 flex w-full max-w-[1440px] flex-col gap-6 pt-10">
        <div className="flex justify-between gap-y-6 max-sm:flex-col max-sm:items-center">
          <div>
            <p className=" text-[36px] font-bold">Open Editions @ Flex</p>
            <p className="mt-2 text-grays max-sm:text-center">
              Unlimited Community Powerrrr
            </p>
          </div>
          <div
            className="relative flex w-fit cursor-pointer items-center justify-center gap-2 text-xl backdrop-blur-[2px] max-md:px-4"
            onClick={() => {
              window.open(
                "https://beta-open-editions.hyperflex.market/create-open-edition",
                "none",
              );
            }}
          >
            {/* <div className="absolute inset-0 bg-[#fb4eb6]/45 z-[-1] transition-colors duration-500 ease-in-out"></div> */}
            <div className="flex items-center gap-2 text-white max-sm:flex-col">
              <p>Psst, are you a Creator?</p>
              <p className="text-[#ff43b4]">Create HERE →</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-12 px-8 uppercase max-md:px-5">
            {tabs.map((item, index) => {
              if (tabActive == item)
                return (
                  <div
                    className="text-xl font-bold text-primary hover:cursor-pointer"
                    key={index}
                  >
                    <p className="text-shadow">{item}</p>
                  </div>
                );
              else
                return (
                  <div
                    className="text-xl font-bold text-grays/65 hover:cursor-pointer hover:text-primary"
                    key={index}
                    onClick={() => setTabActive(item)}
                  >
                    <p className="">{item}</p>
                  </div>
                );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {openEditions?.map((item, index) => (
            <OpenEditionsCard openEdition={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenEditions;
