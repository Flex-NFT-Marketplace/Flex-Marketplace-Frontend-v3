"use client";

import Infor from "./Infor";
import Profile from "./Profile";
import Traits from "./Traits";
import {
  NftLoadActionEnum,
  useNftContext,
} from "@/services/providers/NFTProvider";
import { useEffect } from "react";
import Sell from "./(action)/Sell";
import Buy from "./(action)/Buy";
import { SignStatusEnum } from "@/types/ISignature";
import CancelOrder from "./(action)/CancelOrder";
import Pending from "./(action)/Pending";
import Action from "../(signature)/SignatureList";
import { SchemaTypeEnum } from "@/types/INft";
import { useAccount } from "@starknet-react/core";
import Bid from "./(action)/Bid";

const NFTDetail = () => {
  const { address, status } = useAccount();

  const { nftStaging, getNft, isOwner, loadingStatus, bestAsk, collection } =
    useNftContext();

  useEffect(() => {
    getNft();
  }, [address]);

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  const renderAction = () => {
    if (loadingStatus === NftLoadActionEnum.LOADED_IS_OWNER) {
      if (collection?.standard == SchemaTypeEnum.ERC721) {
        if (bestAsk && bestAsk.status === SignStatusEnum.BUYING)
          return <Pending signature={bestAsk} />;

        if (isOwner) {
          if (!bestAsk)
            return <Sell nftData={nftStaging} schema={collection?.standard} />;
          return (
            <CancelOrder
              nftData={nftStaging}
              signature={bestAsk}
              schema={collection?.standard}
            />
          );
        } else {
          if (bestAsk)
            return (
              <Buy
                nftData={nftStaging}
                signature={bestAsk}
                schema={collection?.standard}
              />
            );
          else
            return <Bid nftData={nftStaging} schema={collection?.standard} />;
        }
      } else if (collection?.standard == SchemaTypeEnum.ERC1155) {
        if (bestAsk?.signer == address) {
          if (bestAsk && bestAsk.status === SignStatusEnum.BUYING)
            return <Pending signature={bestAsk} />;

          if (!bestAsk)
            return <Sell nftData={nftStaging} schema={collection?.standard} />;
          return (
            <CancelOrder
              nftData={nftStaging}
              signature={bestAsk}
              schema={collection?.standard}
            />
          );
        } else {
          if (bestAsk)
            return (
              <Buy
                nftData={nftStaging}
                signature={bestAsk}
                schema={collection?.standard}
              />
            );
          else if (isOwner)
            return <Sell nftData={nftStaging} schema={collection?.standard} />;
          else
            return <Bid nftData={nftStaging} schema={collection?.standard} />;
        }
      } else return <></>;
    } else {
      if (status == "disconnected" && bestAsk)
        return (
          <Buy
            nftData={nftStaging}
            signature={bestAsk}
            schema={collection?.standard}
          />
        );
      else if (isOwner)
        return <Sell nftData={nftStaging} schema={collection?.standard} />;
      else return <Bid nftData={nftStaging} schema={collection?.standard} />;
    }
  };

  return (
    <div className="fixed-height-under-header flex h-full justify-between gap-5 px-8 pb-6 pt-4 max-lg:flex-wrap max-md:px-4">
      <Profile />

      <div className="flex w-full flex-1 flex-col gap-6 overflow-auto">
        <Infor />
        {renderAction()}

        {/* <Action /> */}
        <Traits />
        <Action schema={collection?.standard} />

        {/* <div className="w-full">
          <div className="flex items-center gap-4 border-b border-stroke pb-2">
            <p className="text-shadow text-xl font-normal">ACTIVITIES</p>
          </div>
          <Activity />
        </div> */}
      </div>
    </div>
  );
};

export default NFTDetail;
