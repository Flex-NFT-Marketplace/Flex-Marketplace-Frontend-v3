"use client";
import { useState } from "react";
import DropsTab from "./Drops";
import OpenCreateTab from "./OpenCreateTab";

import Activities from "./Activities";
import { FaUser } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { MdLeaderboard } from "react-icons/md";
import { TbNews } from "react-icons/tb";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";

enum TabsEnum {
  // OPEN_CREATE = "Open-create",
  DROPS = "Drops",
  LEADERBOARD = "leaderboard",
  PROFILE = "profile",
  ACTIVITIES = "activities",
}

const NewsFeed = () => {
  const tabs = [
    // "Open-create",
    "Drops",
    "leaderboard",
  ];
  const [activeTab, setActiveTab] = useState<string>(TabsEnum.DROPS);

  return (
    <div className="flex-1">
      <div className="sticky top-16 z-[1] flex gap-6 border-b border-line bg-black px-5 py-4 max-md:hidden">
        <p
          onClick={() => setActiveTab(TabsEnum.PROFILE)}
          className={`cursor-pointer font-bold uppercase xl:hidden ${activeTab == TabsEnum.PROFILE ? "text-shadow text-white" : "text-grays"} `}
        >
          {TabsEnum.PROFILE}
        </p>
        <p
          onClick={() => setActiveTab(TabsEnum.ACTIVITIES)}
          className={`cursor-pointer font-bold uppercase md:hidden ${activeTab == TabsEnum.ACTIVITIES ? "text-shadow text-white" : "text-grays"} `}
        >
          {TabsEnum.ACTIVITIES}
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
      </div>
      <div className="sticky top-16 z-[1] flex gap-6 border-b border-line bg-black px-5 py-4 md:hidden">
        {/* <GoHomeFill
          onClick={() => setActiveTab(TabsEnum.OPEN_CREATE)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.OPEN_CREATE ? "text-white" : "text-grays"}`}
        /> */}
        <TbNews
          onClick={() => setActiveTab(TabsEnum.DROPS)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.DROPS ? "text-white" : "text-grays"}`}
        />
        <LuActivity
          onClick={() => setActiveTab(TabsEnum.ACTIVITIES)}
          className={`flex-1 text-xl ${activeTab == TabsEnum.ACTIVITIES ? "text-white" : "text-grays"}`}
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
      {/* {activeTab === TabsEnum.OPEN_CREATE && <OpenCreateTab />} */}
      {activeTab === TabsEnum.DROPS && <DropsTab />}
      {activeTab === TabsEnum.PROFILE && <Profile />}
      {activeTab === TabsEnum.ACTIVITIES && <Activities />}
      {activeTab === TabsEnum.LEADERBOARD && <Leaderboard />}
    </div>
  );
};

export default NewsFeed;
