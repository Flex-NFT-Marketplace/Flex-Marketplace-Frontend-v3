import ImageKit from "@/packages/@ui-kit/Image";
import { useSocial } from "@/services/providers/SocialProvider";
import { ILeaderboardItem } from "@/types/Iperks";
import { strShortAddress } from "@/utils/string";
import { useState } from "react";

interface RankCardProps {
  leaderboardItem: ILeaderboardItem;
}

const RankCard: React.FC<RankCardProps> = ({ leaderboardItem }) => {
  const getRank = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="grid place-items-center border border-primary rounded w-6 aspect-square">
            <p className="text-primary text-center">{rank}</p>
          </div>
        );
      case 2:
        return (
          <div className="grid place-items-center border border-secondary rounded w-6 aspect-square">
            <p className="text-secondary text-center">{rank}</p>
          </div>
        );
      case 3:
        return (
          <div className="grid place-items-center border border-blue rounded w-6 aspect-square">
            <p className="text-blue text-center">{rank}</p>
          </div>
        );

      default:
        return (
          <div className="grid place-items-center  rounded w-6 aspect-square">
            <p className="text-grays text-center">#{rank}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {getRank(leaderboardItem.rank)}
        <div className="flex items-center gap-3">
          <ImageKit src="" className="w-12 h-12" />
          <div className="flex flex-col">
            <p className="font-bold">
              {strShortAddress(leaderboardItem.user.address)}
            </p>
            <p className="">{strShortAddress(leaderboardItem.user.address)}</p>
          </div>
        </div>
      </div>
      <p>{leaderboardItem.amount} BYTE</p>
    </div>
  );
};

const TabsEnum = {
  TOP_SUPPORTERS: "Top supporters",
  RECENTS: "Recents",
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState(TabsEnum.TOP_SUPPORTERS);
  const { leaderboardByEvent } = useSocial();

  return (
    <div className="px-5 py-4">
      {/* <div className="flex gap-5">
        <div className="flex flex-col gap-3">
          <p className="uppercase font-bold">36k BYTE</p>
        </div>
      </div> */}

      {/* <div className="uppercase flex gap-6 py-4 border-b border-border">
        {Object.values(TabsEnum).map((tab, index) => (
          <p
            onClick={() => setActiveTab(tab)}
            key={index}
            className={`${activeTab !== tab && "text-grays"} cursor-pointer`}
          >
            {tab}
          </p>
        ))}
      </div> */}
      {leaderboardByEvent.length <= 0 && (
        <p className="text-grays">No leaderboard found</p>
      )}
      <div className="py-4 flex flex-col gap-3">
        {leaderboardByEvent.map((item, index) => {
          return <RankCard leaderboardItem={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
