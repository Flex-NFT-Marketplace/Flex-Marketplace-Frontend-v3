import DropCard from "@/components/DropCard";
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
      <div className="mt-6 gap-4 grid grid-cols-2 max-[1350px]:grid-cols-1 max-xl:grid-cols-2 max-[950px]:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
        {dropsByCreator.map((drop, index) => {
          return <DropCard drop={drop} key={index} />;
        })}
      </div>
    </div>
  );
};

export default DropsInventory;
