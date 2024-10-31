import DropCard from "@/components/DropCard";
import { useState } from "react";

enum DropsInventoryEnum {
  UNPROTECTED = "Unprotected",
  PROTECTED = "Protected",
  ALL = "All",
}

const DropsInventory = () => {
  const [activeTab, setActiveTab] = useState<string>(
    DropsInventoryEnum.UNPROTECTED,
  );
  return (
    <div>
      <div className="flex items-center gap-2 font-bold uppercase">
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
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <DropCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default DropsInventory;
