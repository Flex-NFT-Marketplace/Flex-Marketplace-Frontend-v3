"use client";
import Button from "@/lib/@core/Button";
import { strShortAddress } from "@/utils/string";
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

const About = () => {
  const [maxSupply, setMaxSupply] = useState(999);
  const [currentSupply, setCurrentSupply] = useState(200);

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
          <IoMdShare className={`aspect-square h-5`} />
          <RiGlobalLine className={`aspect-square h-5`} />
          <FaSquareXTwitter className={`aspect-square h-5`} />
          <SiFarcaster className={`aspect-square h-5`} />
          <IoLogoDiscord className={`aspect-square h-5`} />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="aspect-square h-[52px]">
            <ImageKit src="" alt="" className="h-full w-full" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p>UserName</p>
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
                  Items <span className="text-white">20k</span>
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
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="flex items-center justify-between">
          <p className="text-grays">
            {((currentSupply / maxSupply) * 100).toFixed(2)}% minted
          </p>
          <p className="">
            {currentSupply}/{maxSupply}
          </p>
        </div>
        <div className="w-full bg-border relative h-1">
          <div
            style={{ width: (currentSupply / maxSupply) * 100 + "%" }}
            className="absolute h-full bg-primary"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;
