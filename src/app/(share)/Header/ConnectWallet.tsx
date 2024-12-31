import useModal from "@/hooks/useModal";
import Button from "@/lib/@core/Button";
import Modal from "@/lib/@core/Modal";
import ModalConnectWallet from "./ModalConnectWallet";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import Menu from "./Menu";
import { connect, disconnect } from "starknetkit";
import { useEffect, useState } from "react";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { strShortAddress, strShortPrefixAddress } from "@/utils/string";
import UserImg from "@/assets/user.png";
import { useRouter } from "next/navigation";
import { FaWallet } from "react-icons/fa";

const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  const { data, isLoading, isFetching } = useStarkProfile({ address });
  const { isOpen: isOpenConnectWallet, toggleModal: toggleConnectWallet } =
    useModal();
  const { profileOwner } = useAccountContext();
  const router = useRouter();
  const onNavigate = (path: string) => {
    router.push(path);
    toggleMenu();
  };
  const { isOpen: isOpenMenu, toggleModal: toggleMenu } = useModal();
  return (
    <div>
      <ModalConnectWallet
        isShowing={isOpenConnectWallet}
        hide={toggleConnectWallet}
      />
      {!isConnected ? (
        <div>
          <div className="hidden max-sm:flex">
            <button onClick={toggleConnectWallet}>
              <FaWallet />
            </button>
          </div>
          <div className="max-sm:hidden">
            <Button title="Connect Wallet" onClick={toggleConnectWallet} />
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={isOpenMenu ? undefined : toggleMenu}
          onMouseLeave={isOpenMenu ? toggleMenu : undefined}
          className="z-50 flex h-[72px] cursor-pointer items-center gap-2 text-white hover:text-primary"
        >
          <p
            className="select-none truncate transition-all duration-150 ease-in-out max-sm:w-[64px]"
            onClick={() => onNavigate("/account/" + address)}
          >
            {
              // profileOwner != undefined && profileOwner.name != ""
              //   ? profileOwner?.name
              //   :
              strShortPrefixAddress(address as string)
            }
          </p>
          <Menu isShowing={isOpenMenu} hide={toggleMenu} />
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
