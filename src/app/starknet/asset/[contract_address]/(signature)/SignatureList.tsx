import { useEffect, useState } from "react";
import ListingList from "./ListingList";
import BidList from "./BidList";
import Activity from "../[token_id]/Activity";

enum TabEnum {
  ACTIVITY = "ACTIVITY",
  LISTINGS = "LISTINGS",
  BIDS = "BIDS",
}

type TabType = TabEnum.LISTINGS | TabEnum.BIDS | TabEnum.ACTIVITY;
const tabs = [TabEnum.ACTIVITY, TabEnum.LISTINGS, TabEnum.BIDS];

interface SignatureListProps {
  schema?: string;
}

const SignatureList: React.FC<SignatureListProps> = (props) => {
  const { schema = "ERC721" } = props;
  const [tabActive, setTabActive] = useState<TabType>(TabEnum.ACTIVITY);

  const renderTab = () => {
    return (
      <div className="flex w-full items-center gap-8 border-b border-stroke pb-2 uppercase">
        {tabs.map((item, index) => {
          if (schema == "ERC721" && item == TabEnum.LISTINGS) {
            return <div key={index}></div>;
          }

          if (tabActive == item)
            return (
              <div
                className="text-shadow text-xl font-bold text-primary hover:cursor-pointer"
                key={index}
              >
                <p className="text-shadow">{item}</p>
              </div>
            );
          else
            return (
              <div
                className="text-xl font-normal text-grays hover:cursor-pointer hover:text-white"
                key={index}
                onClick={() => setTabActive(item)}
              >
                <p className="">{item}</p>
              </div>
            );
        })}
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-between">
      {renderTab()}

      <div className="mt-2">
        {tabActive == TabEnum.ACTIVITY && <Activity />}
        {tabActive == TabEnum.LISTINGS && schema == "ERC721" && <ListingList />}
        {tabActive == TabEnum.BIDS && <BidList />}
      </div>
    </div>
  );
};

export default SignatureList;
