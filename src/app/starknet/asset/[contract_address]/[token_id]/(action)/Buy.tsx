"use client";

import useModal from "@/hooks/useModal";
import SellPopup from "../../../../../../components/Popup/SellPopup";
import { INft } from "@/types/INft";
import BuyPopup from "@/components/Popup/BuyPopup";
import { ISignature } from "@/types/ISignature";
import { useNftContext } from "@/services/providers/NFTProvider";
import Sell from "./Sell";
import { useEffect } from "react";
import { timeElapsedFromTimestamp } from "@/utils/string";
import BidPopup from "@/components/Popup/BidPopup";
import FormatPrice from "@/components/FormatPrice";
import Button from "@/packages/@ui-kit/Button";
import { useAccount, useConnect } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useStarknetkitConnectModal } from "starknetkit";
import { IStagingNft } from "@/types/IStagingNft";

type BuyProps = {
  nftData: IStagingNft | undefined;
  signature: ISignature;
  schema?: string;
};

const Buy: React.FC<BuyProps> = (props) => {
  const { status } = useAccount();
  const { isOpen, toggleModal } = useModal();
  const { isOpen: isOpenSellPopup, toggleModal: toggleSellPopup } = useModal();
  const { isOpen: isOpenBidPopup, toggleModal: toggleBidPopup } = useModal();
  const { nftData, signature, schema = "ERC721" } = props;
  const { onReload, isOwner } = useNftContext();
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
  });

  const onConnect = async () => {
    const { connector } = await starknetkitConnectModal();
    await connect({ connector });
  };

  useEffect(() => {
    console.log(signature);
  }, [signature]);

  return (
    <div className="flex flex-col justify-between gap-4 rounded-md border border-stroke px-4 py-4">
      <BuyPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nft={nftData}
        signature={signature}
        onReload={() => onReload()}
        schema={schema}
      />
      <SellPopup
        isOpen={isOpenSellPopup}
        toggleModal={toggleSellPopup}
        nftData={nftData}
        onReload={onReload}
        schema={schema}
      />
      <BidPopup
        isOpen={isOpenBidPopup}
        toggleModal={toggleBidPopup}
        nftData={nftData}
        onReload={onReload}
        schema={schema}
      />

      <div className="flex justify-between">
        <p className="font-normal uppercase text-grays">Price</p>

        <div className="flex items-center gap-1 font-normal">
          <p className="pr-2 uppercase text-grays">Time left</p>
          <p>{timeElapsedFromTimestamp(signature.sell_end)}</p>
        </div>
      </div>

      <FormatPrice
        price={signature?.price}
        className="text-[36px]"
        currency={signature?.currency}
        iconSize="lg"
      />
      <div className="flex gap-4">
        <Button
          title="Buy"
          onClick={() => {
            if (status === "disconnected") {
              onConnect();
              return;
            }
            toggleModal();
          }}
          className="w-full"
        />

        {isOwner ? (
          <Button
            title="List for sale"
            onClick={() => {
              if (status === "disconnected") {
                onConnect();
                return;
              }
              toggleSellPopup();
            }}
            className="w-full"
          />
        ) : (
          <Button
            title="Place Bid"
            onClick={toggleBidPopup}
            className="w-full"
            variant="secondary"
          />
        )}
      </div>
    </div>
  );
};

export default Buy;
