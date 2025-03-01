import { useSocial } from "@/services/providers/SocialProvider";
import DropList from "./DropList";
import { FilterDrops } from "./NewsFeed";

enum DropsInventoryEnum {
  UNPROTECTED = "Unprotected",
  PROTECTED = "Protected",
  ALL = "All",
}

interface DropsInventoryProps {
  filterDrops: FilterDrops;
}

const DropsInventory: React.FC<DropsInventoryProps> = ({ filterDrops }) => {
  const {
    onGoingDropsByCreator,
    upcomingDropsByCreator,
    distributedDropsByCreator,
    securedCollectiblesByCreator,
    unSecuredCollectiblesByCreator,
  } = useSocial();

  return (
    <div className="flex flex-col gap-8 px-5 py-4">
      {/* <div className="flex items-center gap-2 font-bold uppercase">
        <p className="text-3xl font-normal text-grays">{`<`}</p>
        <p
          onClick={() => setActiveTab(DropsInventoryEnum.UNPROTECTED)}
          className={`cursor-pointer ${activeTab == DropsInventoryEnum.UNPROTECTED ? "text-white" : "text-grays"}`}
        >
          Unprotected
        </p>
        <p>/</p>
        <p
          onClick={() => setActiveTab(DropsInventoryEnum.PROTECTED)}
          className={`cursor-pointer ${activeTab == DropsInventoryEnum.PROTECTED ? "text-white" : "text-grays"}`}
        >
          Protected
        </p>
        <p>/</p>
        <p
          onClick={() => setActiveTab(DropsInventoryEnum.ALL)}
          className={`cursor-pointer ${activeTab == DropsInventoryEnum.ALL ? "text-white" : "text-grays"}`}
        >
          All
        </p>
        <p className="text-3xl font-normal text-grays">{`>`}</p>
      </div> */}

      {/* {dropsByCreator.length <= 0 && (
        <p className="text-grays">No drops found</p>
      )}
      <div className="gap-4 grid grid-cols-3 max-[1350px]:grid-cols-2 max-xl:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 [@media_(max-width:500px)]:grid-cols-1">
        {dropsByCreator.map((drop, index) => {
          return (
            <DropCard
              contractAddress={drop.collectible.nftContract}
              key={index}
            />
          );
        })}
      </div> */}

      {filterDrops.unprotected && (
        <DropList title="Unprotected" drops={unSecuredCollectiblesByCreator} />
      )}
      {filterDrops.protected && (
        <DropList title="Protected" drops={securedCollectiblesByCreator} />
      )}
      {filterDrops.upcoming && (
        <DropList title="Upcoming" drops={upcomingDropsByCreator} />
      )}
      {filterDrops.ongoing && (
        <DropList title="On-going" drops={onGoingDropsByCreator} />
      )}
      {filterDrops.distributed && (
        <DropList title="Distributed" drops={distributedDropsByCreator} />
      )}
    </div>
  );
};

export default DropsInventory;
