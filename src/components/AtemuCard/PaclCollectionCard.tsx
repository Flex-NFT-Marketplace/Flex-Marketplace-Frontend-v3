"use client";

import { useState } from "react";
import clsx from "clsx";
import { FormatPriceWithIcon } from "../FormatPrice";
import ImageKit from "@/packages/@ui-kit/Image";
import { usePackCollectionContext } from "@/services/providers/PackCollectionProvider";
import Link from "next/link";

enum PaclCollectionCardStatus {
  COMMON = "COMMON",
  CHAOTIC = "CHAOTIC",
  HERO = "HERO",
  MYTHICAL = "MYTHICAL",
  LEGENDARY = "LEGENDARY",
}
interface PaclCollectionCardProps {
  canOpen?: boolean;
}

const PaclCollectionCard: React.FC<PaclCollectionCardProps> = (props) => {
  const { canOpen = false } = props;

  const [status, setStatus] = useState(PaclCollectionCardStatus.COMMON);
  const { packOfOwner } = usePackCollectionContext();
  const baseClasses =
    " border border-stroke hover:border-white select-none rounded relative flex flex-col transition-all duration-100 ease-in-out group";
  const classes = clsx(baseClasses);

  return (
    <Link
      href={`/pack-collection/${"0x4d6ccb91e90da63ab5c74841bc68cbbc0da6d221770aecf4d70d02b6bf41549"}`}
      className="group"
    >
      <div
        className={`relative h-[70%]  min-w-[200px] ${canOpen && "cursor-pointer"}`}
      >
        <div className=" overflow-hidden aspect-square rounded w-full h-full">
          <ImageKit
            src={"/images/launchpad-bg.png"}
            alt=""
            className={`aspect-square w-full h-full rounded-t group-hover:scale-110 group-hover:rounded scale-100 transition-all`}
          />
        </div>
        <div
          className={`absolute z-1 -bottom-3 right-2 text-black border border-dark-black uppercase font-bold text-sm leading-4 py-1 px-3 ${status === PaclCollectionCardStatus.CHAOTIC ? " bg-[#FF2D55]" : status === PaclCollectionCardStatus.COMMON ? "bg-green" : status === PaclCollectionCardStatus.HERO ? "bg-[#63B1FF]" : status === PaclCollectionCardStatus.LEGENDARY ? "bg-secondary" : "bg-[#BF5AF2]"}`}
        >
          {status}
        </div>
      </div>
      <div className="relative flex flex-col gap-1 px-3 py-2 flex-1 ">
        <div>
          <p className="line-clamp-1 truncate text-lg font-normal">
            {"ATEMU PACK COLLECTION"}
          </p>
          {packOfOwner.length > 0 && (
            <p className="line-clamp-1 truncate text-sm font-normal">
              x{packOfOwner.length}
            </p>
          )}
          <div className="h-7">
            <FormatPriceWithIcon
              price={0}
              className="font-normal text-grays"
              size="lg"
              currency={
                "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PaclCollectionCard;
