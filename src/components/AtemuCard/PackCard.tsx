"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { INft, SchemaTypeEnum } from "@/types/INft";
import SellPopup from "@/components/Popup/SellPopup";
import useModal from "@/hooks/useModal";
import BuyPopup from "../Popup/BuyPopup";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import { ICollection } from "@/types/ICollection";
import { useAccount } from "@starknet-react/core";
import UnListPopup from "../Popup/UnListPopup";
import BidPopup from "../Popup/BidPopup";
import clsx from "clsx";
import FormatPrice, { FormatPriceWithIcon } from "../FormatPrice";
import ImageKit from "@/packages/@ui-kit/Image";
import { IStagingNft, IStagingNftResponse } from "@/types/IStagingNft";
import Button from "@/packages/@ui-kit/Button";
import { formattedContractAddress, strShortAddress } from "@/utils/string";
import UnpackPopup from "@/app/pack-collection/UnpackPopup";
import { usePackCollectionContext } from "@/services/providers/PackCollectionProvider";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { toast } from "react-toastify";

enum PackCardStatus {
  COMMON = "COMMON",
  CHAOTIC = "CHAOTIC",
  HERO = "HERO",
  MYTHICAL = "MYTHICAL",
  LEGENDARY = "LEGENDARY",
}
interface PackCardProps {
  canOpen?: boolean;
  pack: IStagingNftResponse;
}

const PackCard: React.FC<PackCardProps> = (props) => {
  const { canOpen = false, pack } = props;

  const { isOpen, toggleModal } = useModal();
  const [isHover, setIsHover] = useState(false);
  const [status, setStatus] = useState(PackCardStatus.COMMON);
  const baseClasses =
    " border border-stroke hover:border-white select-none rounded relative flex flex-col transition-all duration-100 ease-in-out group";
  const classes = clsx(baseClasses);

  const toggleOpenPack = () => {
    // if (packOfOwner.length > 0) {
    //   setPackOpening(packOfOwner[0].nftData);
    //   toggleModal();
    // } else {
    //   toast("You don't have any packs");
    // }

    // setPackOpening(packOfOwner[0].nftData);
    toggleModal();
  };

  return (
    <>
      <UnpackPopup
        packOpening={pack}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
      <div
        className={classes}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          canOpen && toggleOpenPack();
        }}
      >
        <div
          className={`relative h-[70%]  min-w-[200px] ${canOpen && "cursor-pointer"}`}
        >
          <div className=" overflow-hidden aspect-square rounded w-full h-full">
            <ImageKit
              src={"/images/launchpad-bg.png"}
              alt=""
              className={`aspect-square w-full h-full rounded-t ${isHover == true ? "scale-110 rounded" : "scale-[1.01]"} transition-all`}
            />
          </div>
          <div
            className={`absolute z-1 -bottom-3 right-2 text-black border border-dark-black uppercase font-bold text-sm leading-4 py-1 px-3 ${status === PackCardStatus.CHAOTIC ? " bg-[#FF2D55]" : status === PackCardStatus.COMMON ? "bg-green" : status === PackCardStatus.HERO ? "bg-[#63B1FF]" : status === PackCardStatus.LEGENDARY ? "bg-secondary" : "bg-[#BF5AF2]"}`}
          >
            {status}
          </div>
        </div>
        <div className="relative flex flex-col gap-1 px-3 py-2 flex-1">
          <div>
            <p className="line-clamp-1 truncate text-lg font-normal">
              {pack?.nftData?.nftCollection?.name} #{pack?.nftData?.tokenId}
            </p>

            <div className="h-7">
              <FormatPriceWithIcon
                price={0}
                className="font-normal text-grays"
                size="lg"
                currency={
                  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                }
              />
              {strShortAddress(pack?.nftData?.owner?.address)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackCard;
