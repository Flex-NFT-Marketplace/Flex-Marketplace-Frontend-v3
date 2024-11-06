"use client";
import Button from "@/lib/@core/Button";
import { copyToClipboard, strShortAddress } from "@/utils/string";
import { IoMdShare } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { IoLogoDiscord } from "react-icons/io5";
import edit_calender from "@/assets/edit_calendar.svg";
import checked_calendar from "@/assets/checked_calender.svg";
import badge_check from "@/assets/badge-check.svg";
import ImageKit from "@/packages/@ui-kit/Image";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAtemuContext } from "./AtemuMintProvider";

const About = () => {
  const { supply } = useAtemuContext();
  const [maxSupply, setMaxSupply] = useState(999);
  const { onShowToast } = useToast();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <p
          title={"Atemu: og collection"}
          className="line-clamp-1 text-[44px] uppercase max-md:text-2xl"
        >
          Atemu: og collection
        </p>
        <div className="flex gap-5">
          <IoMdShare
            onClick={() => {
              copyToClipboard(window.location.href);
              onShowToast("Link copied to clipboard");
            }}
            className={`aspect-square h-5 cursor-pointer`}
          />
          <Link href={`https://atemu.xyz/`} target="_blank">
            <RiGlobalLine className={`aspect-square h-5 cursor-pointer`} />
          </Link>
          <Link href={"https://x.com/atemu_world"} target="_blank">
            <FaSquareXTwitter className={`aspect-square h-5 cursor-pointer`} />
          </Link>
          <SiFarcaster className={`aspect-square h-5 text-grays`} />
          <IoLogoDiscord className={`aspect-square h-5 text-grays`} />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="aspect-square h-[52px]">
            <ImageKit src="" alt="" className="h-full w-full" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p>Atemu.stark</p>
              <ImageKit src={badge_check.src} alt="" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <p>{strShortAddress("0x000000000")}</p>
                <MdOutlineContentCopy
                  className={`aspect-square h-4  text-grays`}
                />
              </div>
              <div className="h-4 w-[1px] bg-grays"></div>
              <div>
                <p className="text-grays">
                  Items <span className="text-white">999</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-grays">
          🔥 The Atemu OG Collection is here—the first-ever TCG drop on
          Starknet. Just 999 packs, each a gateway to rare gods, heroes, and
          relics that hold legendary power. Own a piece of history, rule the
          realms, and stake your claim in the future of on-chain TCG.
        </p>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-grays">
            {((supply / maxSupply) * 100).toFixed(2)}% minted
          </p>
          <p className="">
            {supply}/{maxSupply}
          </p>
        </div>
        <div className="bg-border relative h-1 w-full">
          <div
            style={{ width: (supply / maxSupply) * 100 + "%" }}
            className="absolute h-full bg-primary"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;
