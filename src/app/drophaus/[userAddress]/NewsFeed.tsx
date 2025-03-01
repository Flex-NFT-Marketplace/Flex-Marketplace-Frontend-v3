"use client";
import { useEffect, useState } from "react";

import { FaRegObjectGroup, FaUser } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { TbNews } from "react-icons/tb";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import Sets from "./Sets";
import { IoFilter } from "react-icons/io5";
import DropsInventory from "./DropsInventory";
import Checkbox from "@/lib/@core/Checkbox";
import { useParams } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { formattedContractAddress } from "@/utils/string";
import MyDistributed from "./MyDistributed";

enum TabsEnum {
  // OPEN_CREATE = "Open-create",
  DROPS = "Drops",
  LEADERBOARD = "leaderboard",
  PROFILE = "profile",
  // ACTIVITIES = "activities",
  MY_DISTRIBUTED = "my distributed",
  SETS = "sets",
}

export interface FilterDrops {
  unprotected: boolean;
  protected: boolean;
  all: boolean;
  upcoming: boolean;
  ongoing: boolean;
  distributed: boolean;
}

const NewsFeed = () => {
  const tabs = [
    // "Open-create",
    "Drops",
    "sets",
    "leaderboard",
  ];
  const { userAddress } = useParams();
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<string>(TabsEnum.DROPS);
  const [filterDrops, setFilterDrops] = useState<FilterDrops>({
    unprotected: true,
    protected: true,
    all: true,
    upcoming: true,
    ongoing: true,
    distributed: true,
  });

  const updateFilterDrops = (filter: keyof FilterDrops) => {
    if (filter === "all") {
      if (!filterDrops.all) {
        setFilterDrops((prevState) => ({
          ...prevState,
          unprotected: true,
          protected: true,
          all: true,
        }));
      } else {
        setFilterDrops((prevState) => ({
          ...prevState,
          unprotected: false,
          protected: false,
          all: false,
        }));
      }
      return;
    }

    setFilterDrops((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };

  useEffect(() => {
    if (!filterDrops.protected || !filterDrops.unprotected) {
      setFilterDrops((prev) => {
        return {
          ...prev,
          all: false,
        };
      });
    } else if (filterDrops.protected && filterDrops.unprotected) {
      setFilterDrops((prev) => {
        return {
          ...prev,
          all: true,
        };
      });
    }
  }, [filterDrops.protected, filterDrops.unprotected]);

  return (
    <div className="flex-1">
      <div className="sticky top-16 z-[1] max-md:hidden flex justify-between border-b border-line bg-background px-5 py-4">
        <div className="flex items-center gap-6">
          <p
            onClick={() => setActiveTab(TabsEnum.PROFILE)}
            className={`cursor-pointer font-bold uppercase xl:hidden ${activeTab == TabsEnum.PROFILE ? "text-shadow text-white" : "text-grays"} `}
          >
            {TabsEnum.PROFILE}
          </p>
          {tabs.map((tab) => (
            <p
              onClick={() => setActiveTab(tab)}
              key={tab}
              className={`cursor-pointer font-bold uppercase ${activeTab == tab ? "text-shadow text-white" : "text-grays"} `}
            >
              {tab}
            </p>
          ))}

          {formattedContractAddress(userAddress as string) ==
            formattedContractAddress(address) && (
            <p
              onClick={() => setActiveTab(TabsEnum.MY_DISTRIBUTED)}
              className={`cursor-pointer font-bold uppercase ${activeTab == TabsEnum.MY_DISTRIBUTED ? "text-shadow text-white" : "text-grays"} `}
            >
              {TabsEnum.MY_DISTRIBUTED}
            </p>
          )}
        </div>
        <div
          className={`relative group ${activeTab !== TabsEnum.DROPS && "hidden"}`}
        >
          <IoFilter className="" />
          <div className="group-hover:flex hidden pt-4 absolute top-0 right-0">
            <div className="gap-8 flex p-4 rounded-lg border border-border bg-background">
              <div>
                <p className="uppercase font-bold">Inventory</p>
                <div className="mt-4 flex flex-col gap-2">
                  <div
                    onClick={() => updateFilterDrops("unprotected")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.unprotected}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>Unprotected</p>
                  </div>
                  <div
                    onClick={() => updateFilterDrops("protected")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.protected}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>Protected</p>
                  </div>
                  <div
                    onClick={() => updateFilterDrops("all")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.all}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>All</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="uppercase font-bold">Their create</p>
                <div className="mt-4 flex flex-col gap-2">
                  <div
                    onClick={() => updateFilterDrops("upcoming")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.upcoming}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>Upcoming</p>
                  </div>
                  <div
                    onClick={() => updateFilterDrops("ongoing")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.ongoing}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>On-going</p>
                  </div>
                  <div
                    onClick={() => updateFilterDrops("distributed")}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      isChecked={filterDrops.distributed}
                      onChange={() => {}}
                      className="pointer-events-none"
                    />
                    <p>Distributed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-[1] flex gap-6 border-b border-line bg-black px-5 py-4 md:hidden">
        <TbNews
          onClick={() => setActiveTab(TabsEnum.DROPS)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.DROPS ? "text-white" : "text-grays"}`}
        />

        <FaRegObjectGroup
          onClick={() => setActiveTab(TabsEnum.SETS)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.SETS ? "text-white" : "text-grays"}`}
        />

        <MdLeaderboard
          onClick={() => setActiveTab(TabsEnum.LEADERBOARD)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.LEADERBOARD ? "text-white" : "text-grays"}`}
        />

        <FaUser
          onClick={() => setActiveTab(TabsEnum.PROFILE)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.PROFILE ? "text-white" : "text-grays"}`}
        />
      </div>

      {activeTab === TabsEnum.DROPS && (
        <DropsInventory filterDrops={filterDrops} />
      )}
      {activeTab === TabsEnum.PROFILE && <Profile />}
      {activeTab === TabsEnum.SETS && <Sets />}
      {activeTab === TabsEnum.LEADERBOARD && <Leaderboard />}
      {activeTab === TabsEnum.MY_DISTRIBUTED &&
        formattedContractAddress(userAddress as string) ==
          formattedContractAddress(address) && <MyDistributed />}
    </div>
  );
};

export default NewsFeed;
