import { useState } from "react";
import DropsInventory from "./DropsInventory";

enum DropsTabEnum {
  INVENTORY = "Inventory",
  CREATE = "Create",
}

const DropsTab = () => {
  const tabs = ["Inventory", "Create"];
  const [activeTab, setActiveTab] = useState<string>(DropsTabEnum.INVENTORY);

  return (
    <div className="px-5 py-4">
      {/* <div className="flex gap-6 border-b border-line pb-4">
        {tabs.map((tab) => (
          <p
            onClick={() => setActiveTab(tab)}
            key={tab}
            className={`cursor-pointer font-bold uppercase ${activeTab == tab ? "text-white" : "text-grays"} `}
          >
            {tab}
          </p>
        ))}
      </div> */}
      {/* {activeTab === DropsTabEnum.INVENTORY && <DropsInventory />} */}
    </div>
  );
};

export default DropsTab;
