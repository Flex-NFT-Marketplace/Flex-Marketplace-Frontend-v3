"use client";
import React from "react";
import Image from "next/image";
import LogoSVG from "../../../../public/logo-flex.svg";
import Button from "@/packages/@ui-kit/Button";
import Link from "next/link";
import Modal from "@/packages/@ui-kit/Modal";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import ConnectWallet from "./ConnectWallet";
import clsx from "clsx";
import Search from "./Search";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";

const pages = {
  "/create-drop": "Create",
  "/drophaus": "Drops",
  // "/launchpad": "Launchpad",
  "/activity": "Activity",
  "/staking": "Staking",
  "/mint": "Mint",
  // "/open-editions": "Open-Edition",
};

const Header = () => {
  const { isShow, toggle } = useModal();
  const { isShow: isShowDropDown, toggle: toggleDropDown } = useModal();
  const router = useRouter();

  const classes = clsx(
    "fixed left-0 right-0 top-0 z-20 bg-background flex h-[64px] items-center justify-between border-b border-line px-8 max-sm:px-4 backdrop-blur-[6px]"
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    toggleDropDown();
  };

  return (
    <div className={classes}>
      <Modal isShow={isShow} hide={toggle}>
        <div>
          <p>sss</p>
        </div>
      </Modal>

      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={LogoSVG}
            alt="logo"
            width={60}
            height={100}
            className="h-[40px]"
          />
        </Link>

        {/* <Input icon={<IoSearch />} placeholder="Search" /> */}
        <Search />
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-4 max-lg:hidden">
          {Object.entries(pages).map(([path, title]) => (
            <Link key={path} href={path}>
              <Button variant="ghost">{title}</Button>
            </Link>
          ))}
        </div>

        <div className="mx-4 h-6 w-[2px] bg-line"></div>

        {/* <Button
          variant="icon"
          icon={<IoMdNotifications />}
          onClick={toggle}
        ></Button>
        <Button
          variant="icon"
          icon={<IoMdCart />}
          onClick={() => onShowToast("Hello")}
        ></Button> */}

        <ConnectWallet />

        <div onClick={toggleDropDown} className="lg:hidden">
          <IoMenu className="text-xl" />
        </div>

        {isShowDropDown && (
          <div className="absolute right-0 top-full z-30 flex animate-fade-down flex-col gap-2 border border-line bg-black p-2 animate-duration-150">
            {Object.entries(pages).map(([path, title], index) => (
              <div key={index}>
                <Button
                  onClick={() => handleNavigate(path)}
                  variant="ghost"
                  className="w-full !justify-end"
                >
                  {title}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
