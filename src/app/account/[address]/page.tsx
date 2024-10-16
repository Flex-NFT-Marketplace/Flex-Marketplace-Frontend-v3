"use client";
import { useRouter } from "next/navigation";

import CardNFT from "@/components/CardNFT";
import IImage from "@/lib/@core/Image";
import { MdContentCopy, MdOutlineFilterAlt } from "react-icons/md";
import Profile from "./Profile";
import { TbReload } from "react-icons/tb";
import Icon from "@/lib/@core/Icon";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { INft } from "@/types/INft";
import { useContext, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import Listing from "./Listing";
import Inventory from "./Inventory";
import { Router } from "next/router";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import Biding from "./Biding";

enum TabEnum {
  INVENTORY = "INVENTORY",
  LISTINGS = "LISTINGS",
  BIDS = "BIDS",
}

type TabType = TabEnum.INVENTORY | TabEnum.LISTINGS | TabEnum.BIDS;

const tabs = [TabEnum.INVENTORY, TabEnum.LISTINGS, TabEnum.BIDS];

const AccountPage = () => {
  const { address } = useParams();

  const { address: accountAddress } = useAccount();
  const { nfts, setAddress, onReload, loading } = useAccountContext();

  const [tabActive, setTabActive] = useState<TabType>(TabEnum.INVENTORY);

  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);

  useEffect(() => {
    setIsLoadingHeader(loading);
  }, [loading]);

  useEffect(() => {
    setAddress(address as string);
  }, [address]);

  useEffect(() => { }, []);

  useEffect(() => {
    setTabActive(TabEnum.INVENTORY);
  }, [accountAddress]);

  const renderTab = () => {
    if (address == accountAddress) {
      return (
        <div className="flex items-center gap-8 px-8 uppercase max-md:px-5">
          {tabs.map((item, index) => {
            if (tabActive == item)
              return (
                <div
                  className="text-xl text-primary hover:cursor-pointer"
                  key={index}
                >
                  <p className="text-shadow">{item}</p>
                </div>
              );
            else
              return (
                <div
                  className="text-xl text-grays hover:cursor-pointer hover:text-primary"
                  key={index}
                  onClick={() => setTabActive(item)}
                >
                  <p className="">{item}</p>
                </div>
              );
          })}
        </div>
      );
    } else {
      return (
        <div className="ml-8 text-xl text-primary hover:cursor-pointer">
          <p className="text-shadow">INVENTORY</p>
        </div>
      );
    }
  };

  return (
    <div className="fixed-height-under-header flex flex-col overflow-auto">
      <div className="top-0 z-10">
        <Profile />
        <div className="w-full overflow-auto border-b border-stroke">
          <div className="flex h-[52px] justify-between font-normal">
            <div className="flex items-center gap-8 uppercase">
              {renderTab()}
              {/* <div className="text-xl">
              <p className="text-shadow">Inventory</p>
            </div>
            <div className="text-xl text-grays">
              <p>Listings</p>
            </div>
            <div className="text-xl text-grays">
              <p>Activity</p>
            </div>
            <div className="text-xl text-grays">
              <p>Bids</p>
            </div> */}
            </div>

            {/* <div className="flex items-center gap-3 py-2">
            <Icon>
              <TbReload />
            </Icon>
            <Icon>
              <MdOutlineFilterAlt />
            </Icon>
          </div> */}
          </div>
        </div>
      </div>

      {tabActive == TabEnum.INVENTORY && <Inventory />}
      {tabActive == TabEnum.LISTINGS && <Listing />}
      {tabActive == TabEnum.BIDS && <Biding />}
    </div>
  );
};

export default AccountPage;
