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
import { IStagingNft } from "@/types/IStagingNft";
import Button from "@/packages/@ui-kit/Button";
import { formattedContractAddress } from "@/utils/string";

interface CardNFTProps {
  nft: IStagingNft;
  isShowFilter?: boolean;
  isShowActivity?: boolean;
  bestAsk?: ISignature;
  bestBid?: ISignature;
  collection?: ICollection;
  onReload: () => void;
}

enum CardNFTModeAction {
  NOT_LISTED = "NOT_LISTED",
  LISTING = "LISTING",
  PENDING = "PENDING",
}

const CardNFT: React.FC<CardNFTProps> = (props) => {
  const {
    nft,
    isShowFilter,
    isShowActivity,
    bestAsk,
    collection,
    onReload,
    bestBid,
  } = props;

  const { isOpen: isOpenSellModal, toggleModal: toggleSellModal } = useModal();
  const { isOpen: isOpenBuyModal, toggleModal: toggleBuyModal } = useModal();
  const { isOpen: isOpenUnListModal, toggleModal: toggleUnListModal } =
    useModal();
  const { isOpen: isOpenBidModal, toggleModal: toggleBidModal } = useModal();
  const { address } = useAccount();

  const [isHover, setIsHover] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const [cardMode, setCardMode] = useState(CardNFTModeAction.NOT_LISTED);

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/starknet/asset/" + nft.nftContract + "/" + nft.tokenId);
  };

  useEffect(() => {
    if (address) {
      setIsOwner(
        formattedContractAddress(address) ==
          formattedContractAddress(nft.owner.address)
      );
    }

    if (bestAsk) {
      if (collection?.schema == SchemaTypeEnum.ERC721) {
        if (bestAsk.status == SignStatusEnum.BUYING)
          setCardMode(CardNFTModeAction.PENDING);
        else setCardMode(CardNFTModeAction.LISTING);
      } else if (collection?.schema == SchemaTypeEnum.ERC1155) {
        if (bestAsk.signer == address) setCardMode(CardNFTModeAction.LISTING);
        else setCardMode(CardNFTModeAction.NOT_LISTED);
      }
    } else setCardMode(CardNFTModeAction.NOT_LISTED);
  }, [bestAsk, address]);

  const baseClasses =
    "border border-stroke hover:border-white select-none overflow-hidden rounded scale-[0.92] relative flex flex-col transition-all duration-100 ease-in-out mb-[-0.75rem] group";

  // Define width classes with improved granularity and consistency
  const widthClasses =
    "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[14.2857%] 2xl:w-[10%]";

  // Separate classes for different states involving filters or activity views
  const filterOrActivityWidthClasses =
    "hidden sm:block sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-[12.5%]";
  const filterAndActivityWidthClasses =
    "hidden sm:block sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/6";

  const classes = clsx(
    baseClasses,
    isShowFilter && isShowActivity
      ? filterAndActivityWidthClasses
      : isShowFilter || isShowActivity
        ? filterOrActivityWidthClasses
        : widthClasses
  );

  return (
    <div
      className={classes}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <SellPopup
        isOpen={isOpenSellModal}
        toggleModal={() => {
          toggleSellModal();
          setIsHover(false);
        }}
        nftData={nft}
        onReload={onReload}
        schema={collection?.schema as string}
      />

      <BidPopup
        isOpen={isOpenBidModal}
        toggleModal={() => {
          toggleBidModal();
          setIsHover(false);
        }}
        nftData={nft}
        onReload={onReload}
        schema={collection?.schema as string}
      />

      <BuyPopup
        isOpen={isOpenBuyModal}
        toggleModal={() => {
          toggleBuyModal();
          setIsHover(false);
        }}
        nft={nft}
        signature={bestAsk as ISignature}
        onReload={onReload}
      />

      <UnListPopup
        isOpen={isOpenUnListModal}
        toggleModal={() => {
          toggleUnListModal();
          setIsHover(false);
        }}
        nft={nft}
        signature={bestAsk as ISignature}
        onReload={onReload}
      />

      {CardNFTModeAction.PENDING == cardMode && (
        <div
          className="absolute inset-0 z-10 border border-dashed border-buy bg-grays/10"
          onClick={(e) => {
            onNavigateDetail();
          }}
        ></div>
      )}

      <div
        className="cursor-pointer overflow-hidden"
        onClick={onNavigateDetail}
      >
        <ImageKit
          src={nft?.image || "https://via.placeholder.com/272"}
          alt=""
          className={`aspect-square w-full rounded-t ${isHover == true ? "scale-110 rounded" : "scale-[1.01]"} transition-all`}
        />
      </div>

      <div className="relative flex flex-col gap-1 px-3 py-2">
        <div className="cursor-pointer" onClick={onNavigateDetail}>
          <p className="line-clamp-1 truncate text-lg font-normal">
            {nft?.name || "#" + nft?.tokenId}
          </p>
          <div className="h-7">
            {(bestAsk?.price && (
              <FormatPrice
                price={bestAsk?.price}
                className="font-normal text-primary"
                size="lg"
                currency={bestAsk?.currency}
              />
            )) || (
              <FormatPriceWithIcon
                price={0}
                className="font-normal text-grays"
                size="lg"
                currency={
                  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                }
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-grays mt-4 group-hover:opacity-0">
          {/* <div className="flex items-center gap-2">
            <p className="text-xs ">Last Sale:</p>
            <p>-</p>
          </div> */}

          <div
            className={`flex items-center gap-2 text-grays text-xs ${!bestBid && "opacity-0"}`}
          >
            <p className="">Best Bid</p>
            <FormatPrice price={bestBid?.price} currency={bestBid?.currency} />
          </div>
        </div>

        {isHover && (
          <div className="absolute bottom-0 left-0 right-0 grid place-items-center">
            <div className="grid w-full grid-cols-2 gap-2">
              {bestAsk?.signer == address &&
                CardNFTModeAction.LISTING == cardMode && (
                  <>
                    <Button
                      className="col-span-2"
                      title="Cancel Order"
                      onClick={async () => {
                        // await onCancelOrder(bestAsk?._id as string);

                        // onReload();
                        toggleUnListModal();
                      }}
                    />
                  </>
                )}

              {isOwner && CardNFTModeAction.NOT_LISTED == cardMode && (
                <>
                  <Button
                    className="col-span-2"
                    title="Listing"
                    onClick={toggleSellModal}
                  />
                </>
              )}
              {!isOwner && (
                <div
                  className="col-span-2 flex px-3 pb-2 gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {bestAsk && (
                    <>
                      <Button
                        title="Buy"
                        className="w-full"
                        onClick={() => {
                          toggleBuyModal();
                        }}
                      />
                    </>
                  )}
                  <Button
                    title="Bid"
                    className="w-full"
                    variant="secondary"
                    onClick={() => {
                      toggleBidModal();
                    }}
                  />
                </div>
              )}

              {CardNFTModeAction.PENDING == cardMode && (
                <>
                  <Button title="Pending" className="col-span-2" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardNFT;
