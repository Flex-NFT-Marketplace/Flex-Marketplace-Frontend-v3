import DropCard from "@/components/DropCard";
import SetCard from "@/components/SetCard";
import { useSocial } from "@/services/providers/SocialProvider";
import { useState } from "react";

enum DropsInventoryEnum {
  UNPROTECTED = "Unprotected",
  PROTECTED = "Protected",
  ALL = "All",
}

const DropsInventory = () => {
  const [activeTab, setActiveTab] = useState<string>(
    DropsInventoryEnum.UNPROTECTED
  );

  const { dropsByCreator } = useSocial();

  return (
    <div>
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
      {dropsByCreator.length <= 0 && (
        <p className="text-grays">No drops found</p>
      )}
      <div className="mt-6 gap-4 grid grid-cols-3 max-[1350px]:grid-cols-2 max-xl:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 [@media_(max-width:500px)]:grid-cols-1">
        {dropsByCreator.map((drop, index) => {
          return (
            <DropCard
              contractAddress={drop.collectible.nftContract}
              key={index}
            />
          );
        })}
        <SetCard
          contractAddress={
            "0x04f6304c4833c634a446783f210aebfb0728a8cfeb1b05177e713c5dd535d462"
          }
        />
      </div>
    </div>
  );
};

export default DropsInventory;
