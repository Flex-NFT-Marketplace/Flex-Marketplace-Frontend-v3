import React from "react";
import ReactDOM from "react-dom";
import { RiInbox2Line } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";
import { MdOutlineExitToApp } from "react-icons/md";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import { useAccountContext } from "@/services/providers/AccountProvider";

interface IMenuProps {
  isShowing: boolean;
  hide: () => void;
}

const Menu: React.FC<IMenuProps> = (props) => {
  const { address } = useAccount();
  const { isShowing, hide } = props;
  const { disconnect } = useDisconnect();

  const router = useRouter();
  const onNavigate = (path: string) => {
    router.push(path);
    hide();
  };

  const onDisconnect = () => {
    disconnect();
    hide();
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          {/* <div
            className="fixed left-0 right-0 top-0 z-20 h-screen w-screen animate-fade bg-black/60 transition-all animate-duration-200 animate-ease-in-out"
            onClick={hide}
          /> */}
          <div onMouseLeave={hide} className="fixed right-0 top-[64px] z-50 flex w-[160px] flex-col gap-3 border border-stroke bg-black/65 backdrop-blur-[6px] px-5 py-4">
            <div
              className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary"
              onClick={() => onNavigate("/account/" + address)}
            >
              <RiInbox2Line color="#8E8E93" />
              <p className="font-normal">INVENTORY</p>
            </div>

            {/* <div className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary">
              <FaDollarSign color="#8E8E93" />
              <p className="font-normal ">RECEIVED OFFERS</p>
            </div>
            <div className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary">
              <ImHammer2 color="#8E8E93" />
              <p className="font-normal ">PLACED BIDS</p>
            </div>
            <div className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary">
              <RiInbox2Line color="#8E8E93" />
              <p className="font-normal ">ACTIVITIES</p>
            </div>
            <div className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary">
              <RiInbox2Line color="#8E8E93" />
              <p className="font-normal ">FAV NFTS</p>
            </div> */}
            <div className="flex h-[1px] cursor-pointer items-center gap-2 bg-grays/50"></div>

            <div
              className="flex cursor-pointer items-center gap-2 text-grays hover:text-primary"
              onClick={onDisconnect}
            >
              <MdOutlineExitToApp color="#8E8E93 " />
              <p className="font-normal hover:text-red-500">DISCONNECT</p>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Menu;
