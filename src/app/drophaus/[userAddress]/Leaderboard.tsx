import ImageKit from "@/packages/@ui-kit/Image";
import { useSocial } from "@/services/providers/SocialProvider";
import { ILeaderboardItem } from "@/types/Iperks";
import { formatTimestamp, strShortAddress } from "@/utils/string";
import { useState } from "react";
import avtDefault from "@/assets/avtDefault.webp";
import { IProfileStaging } from "@/types/IStagingNft";
import { MdCardGiftcard } from "react-icons/md";

export interface RecentLeaderBoard {
  _id: string;
  user: IProfileStaging;
  creator: IProfileStaging;
  event: string;
  amount: number;
  donatedAt: number;
  createdAt: string;
  updatedAt: string;
}
interface RankCardProps {
  leaderboardItem: ILeaderboardItem;
}

interface RecentLeaderBoardProps {
  leaderboardItem: RecentLeaderBoard;
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
    <div className="flex justify-between items-center gap-20">
      <div className="flex items-center gap-4">
        {getRank(leaderboardItem.rank)}
        <div className="flex items-center gap-3">
          <ImageKit
            src={leaderboardItem.creator.avatar || avtDefault.src}
            className="w-12 h-12"
          />
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

const RecentCard: React.FC<RecentLeaderBoardProps> = ({ leaderboardItem }) => {
  return (
    <div className="flex justify-between items-center gap-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <ImageKit
            src={leaderboardItem.user.avatar || avtDefault.src}
            className="w-12 h-12"
          />
          <div className="flex flex-col h-full justify-between">
            <p className="font-bold">
              {strShortAddress(leaderboardItem?.user?.address)}
            </p>
            <p className="">
              {formatTimestamp(
                new Date(leaderboardItem.createdAt).getTime() / 1000,
                false
              )}
            </p>
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
  const {
    leaderboardByEvent,
    lastedLeaderboardByEvent,
    totalPointByEvent,
    myRankByEvent,
    perks,
  } = useSocial();

  return (
    <div className="flex flex-col px-5 py-4 ">
      {!perks || new Date(perks.startTime).getTime() > new Date().getTime() ? (
        <p className="text-grays">No leaderboard found</p>
      ) : (
        <>
          <div className="flex gap-5 mb-8">
            <div className="flex flex-col flex-1 gap-3 border border-border bg-hover p-4 rounded-lg">
              <p className="uppercase font-bold">{totalPointByEvent} BYTE</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green rounded shadow-[0_0_8px_#00FF00]"></div>
                <p>On-going</p>
              </div>
            </div>
            <div className="flex flex-[3] flex-col gap-3 border border-border bg-hover p-4 rounded-lg">
              <p className="uppercase font-bold">my supports</p>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green rounded shadow-[0_0_8px_#00FF00]"></div>
                  <p>Current rank {myRankByEvent ? myRankByEvent : "N/A"}</p>
                </div>
                {/* <div className="flex items-center gap-2">
            <MdCardGiftcard />
            <p>BYTES {"N/A"}</p>
          </div> */}
              </div>
            </div>
          </div>
          <div className="flex md:justify-between gap-20 max-md:flex-col">
            <div className="flex-1">
              <p className="uppercase font-bold mb-4">Ranking</p>
              {leaderboardByEvent.length <= 0 && (
                <p className="text-grays">No leaderboard found</p>
              )}
              <div className="py-4 flex flex-col gap-3">
                {leaderboardByEvent.map((item, index) => {
                  return <RankCard leaderboardItem={item} key={index} />;
                })}
              </div>
            </div>
            <div>
              <p className="uppercase font-bold mb-4">Latest supporters</p>
              {lastedLeaderboardByEvent.length <= 0 && (
                <p className="text-grays">No recent leaderboard found</p>
              )}
              <div className="py-4 flex flex-col gap-3">
                {lastedLeaderboardByEvent.map((item, index) => {
                  return <RecentCard leaderboardItem={item} key={index} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
