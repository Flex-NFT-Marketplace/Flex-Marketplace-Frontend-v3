"use client";

import Image from "next/image";
import Search from "../v2Header/Search";
import LogoPNG from "@/assets/logo-flex.svg";
import { usePathname, useRouter } from "next/navigation";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import LoadingHeader from "./LoadingHeader";
import { useContext, useEffect, useState } from "react";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import { useAccount } from "@starknet-react/core";

const Header = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const onNavigate = (path: string) => {
    router.push(path);
  };

  const { isLoadingHeader } = useContext(LoadingHeaderContext);

  const pathname = usePathname();
  const pages = {
    "/activity": "Activity",
    "/mint": "Mint",
    "/staking": "Staking",
    "/open-editions": "Open-Edition",
  };
  const classes =
    "uppercase hover:text-white transition-all duration-150 ease-in-out max-md:hidden";
  // Inside the component
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 mx-auto flex h-[64px] items-center justify-between  ${scrolled ? "bg-[#080804]/100 backdrop-blur-none" : "bg-[#080804]/75 backdrop-blur-[6px]"} px-8 py-5 transition-colors duration-500 ease-in-out max-md:px-4 `}
    >
      {isLoadingHeader && <LoadingHeader />}
      <div className="flex items-center gap-8">
        <Image
          src={LogoPNG}
          alt="Logo"
          className="w-16 cursor-pointer object-contain"
          onClick={() => onNavigate("/")}
        />
        <div className="flex items-center gap-8">
          <div className="">
            <Search />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 max-md:gap-6 max-sm:gap-0">
        {Object.entries(pages).map(([path, title]) => (
          <Link key={path} href={path}>
            <p
              className={`${classes} ${pathname === path ? "text-primary" : "text-[#929292]"}`}
            >
              {title}
            </p>
          </Link>
        ))}

        {isConnected && (
          <div className="h-6 w-[1px] bg-[#929292] opacity-50 max-md:hidden"></div>
        )}

        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
