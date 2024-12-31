"use client";
import { useEffect, useRef, useState } from "react";
import DailyQuest from "./DailyQuest";
import Leaderboard from "./Leaderboard";
import Recents from "./Recents";
import HorizontalSpinner from "./HorizontalSpinner";

const Rewards = () => {
  const DAILY_QUEST = "daily-quest";
  const LEADERBOARD = "leaderboard";
  const RECENTS = "recents";

  const spinContainer = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(DAILY_QUEST);
  const [isSmallLayout, setIsSmallLayout] = useState(false);
  const [heightSpin, setHeightSpin] = useState(0);

  useEffect(() => {
    if (spinContainer.current) {
      setHeightSpin(spinContainer.current.clientHeight);
    }

    if (window.innerWidth <= 1024) {
      setIsSmallLayout(true);
    } else {
      setIsSmallLayout(false);
    }
  }, []);

  return (
    <div className="fixed-height-under-header flex max-lg:h-full max-lg:flex-col max-md:relative">
      <div className="sticky top-[64px] z-[1] hidden w-full justify-evenly bg-background py-4 max-lg:flex">
        <p
          onClick={() => setActiveTab(DAILY_QUEST)}
          className={`cursor-pointer font-bold uppercase text-grays transition-all  hover:text-white ${activeTab == DAILY_QUEST && "text-primary"}`}
        >
          Daily quest
        </p>
        <p
          onClick={() => setActiveTab(LEADERBOARD)}
          className={`cursor-pointer font-bold uppercase text-grays transition-all  hover:text-white ${activeTab == LEADERBOARD && "text-primary"}`}
        >
          Leaderboard
        </p>
        <p
          onClick={() => setActiveTab(RECENTS)}
          className={`cursor-pointer font-bold uppercase text-grays transition-all hover:text-white ${activeTab == RECENTS && "text-primary"}`}
        >
          Recents
        </p>
      </div>
      {(!isSmallLayout || (isSmallLayout && activeTab == DAILY_QUEST)) && (
        <DailyQuest />
      )}
      <div className="fixed-height-with-header flex flex-1 flex-col overflow-hidden">
        <div className="relative border-b border-line" ref={spinContainer}>
          <HorizontalSpinner />
        </div>
        <div
          style={{
            height: `calc(100% - ${heightSpin}px)`,
          }}
          className="flex"
        >
          {(!isSmallLayout || (isSmallLayout && activeTab == LEADERBOARD)) && (
            <Leaderboard />
          )}
          {(!isSmallLayout || (isSmallLayout && activeTab == RECENTS)) && (
            <Recents />
          )}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
