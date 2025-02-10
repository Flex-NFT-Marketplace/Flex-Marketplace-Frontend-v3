"use client";

import Button from "@/packages/@ui-kit/Button";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useStarknetkitConnectModal } from "starknetkit";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdInventory } from "react-icons/md";
import {
  MessageTypeEnum,
  useToast,
} from "@/packages/@ui-kit/Toast/ToastProvider";
import { usePathname, useRouter } from "next/navigation";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { strShortAddress } from "@/utils/string";
import ImageKit from "@/packages/@ui-kit/Image";
import { deleteCookie } from "@/helpers/cookie";
import { ACCESS_TOKEN, USER_ADDRESS } from "@/constants/cookies";
import { useAuth } from "@/services/providers/AuthProvider";

const ConnectWallet = () => {
  const { address, status, account } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { onShowToast } = useToast();
  const { profileOwner } = useAccountContext();

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
  });

  const onConnect = async () => {
    const { connector } = await starknetkitConnectModal();
    await connect({ connector });
    hiddenDropdown();
  };

  const onDisconnect = async () => {
    disconnect();
    deleteCookie(USER_ADDRESS);
    deleteCookie(ACCESS_TOKEN);
    onShowToast("Disconnected successfully ", MessageTypeEnum.INFO);
  };

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    if (status === "disconnected") {
      setIsShowDropdown(false);
    }
  }, [status]);

  const hiddenDropdown = () => {
    setIsShowDropdown(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // * Navigate to inventory
  const router = useRouter();
  const pathName = usePathname();

  const navigateToInventory = () => {
    router.push("/account/" + address);
    hiddenDropdown();
  };

  // * Hide dropdown when navigate to other page
  useEffect(() => {
    hiddenDropdown();
  }, [pathName]);

  const defaultCSS =
    "relative inline-flex h-10 gap-2 uppercase cursor-pointer items-center justify-center whitespace-nowrap rounded-md hover:bg-line px-3 py-2 text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50";
  const classes = clsx(defaultCSS);

  const defaultCSSElement =
    "z-50 absolute top-10 right-0 bg-background grid mt-1 bg-red transition-all gap-1 rounded-md p-1 anni-item-show max-w-lg border border-line p-1.5 shadow-lg sm:max-w-[425px] w-full";
  const animationClass = isShowDropdown ? "anni-item-show" : "anni-item-hide";
  const classesElement = clsx(defaultCSSElement, animationClass);

  const renderAccountConnect = () => {
    if (status === "connected") {
      return (
        <div className="relative">
          <button
            className={classes}
            onClick={() => setIsShowDropdown(!isShowDropdown)}
          >
            <p className="lowercase">
              {
                // profileOwner != undefined && profileOwner.username != ""
                //   ? profileOwner?.username
                //   :
                strShortAddress(address as string)
              }
            </p>
            {/* <FormatAddress address={address} /> */}
            <ImageKit
              // src={profileOwner?.avatar || profileOwner?.image }
              src={""}
              width={40}
              height={40}
              alt="Flex"
              className="h-6 w-6 rounded-full"
            />
          </button>

          {isShowDropdown && (
            <div ref={dropdownRef} className={classesElement}>
              <DropdownItem
                title="Inventory"
                icon={<MdInventory />}
                onClick={() => navigateToInventory()}
              />
              <div className="mx-1 h-[1px] bg-line"></div>
              <DropdownItem
                title="Disconect"
                icon={<VscDebugDisconnect />}
                onClick={onDisconnect}
              />
            </div>
          )}
        </div>
      );
    }

    return (
      <Button variant="icon" icon={<FaWallet />} onClick={onConnect}></Button>
    );
  };

  return <div>{renderAccountConnect()}</div>;
};

export default ConnectWallet;
