"use client";

import { INft } from "@/types/INft";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useBuyActionNft } from "@/services/context/useBuyActionNft";
import { ISignature } from "@/types/ISignature";
import { useEffect, useState } from "react";
import Modal from "@/packages/@ui-kit/Modal";
import Button from "@/packages/@ui-kit/Button";
import FormatPrice from "../FormatPrice";
import { IoClose } from "react-icons/io5";
import Input from "@/packages/@ui-kit/Input";
import ImageKit from "@/packages/@ui-kit/Image";
import { IStagingNft } from "@/types/IStagingNft";

dayjs.extend(utc);

interface IBuyPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  nft?: IStagingNft;
  signature?: ISignature;
  schema?: string;
  onReload: () => void;
}

const BuyPopup: React.FC<IBuyPopupProps> = (props) => {
  const { isOpen, toggleModal, nft, signature, onReload, schema } = props;
  const [amount, setAmount] = useState(1);
  const { onBuy } = useBuyActionNft();
  const [isError, setIsError] = useState<boolean>(false);

  const onHandleBuy = async () => {
    try {
      if (isError || signature!.amount < amount) return;
      await onBuy(signature as ISignature, nft as IStagingNft, amount);
      toggleModal();
      onReload();
    } catch (error) {
      error;
    }
  };

  useEffect(() => {
    if (amount < 1 || !amount) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [amount]);

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Buy NFT</p>
          <Button icon={<IoClose />} variant="icon" onClick={toggleModal} />
        </div>

        <div className="flex items-center gap-4">
          <ImageKit
            width={100}
            height={100}
            alt=""
            src={nft?.image}
            className="aspect-square w-[75px] rounded-md"
          />
          <div className="flex flex-1 flex-col">
            <p className="font-bold">{nft?.name}</p>
          </div>
        </div>

        {schema == "ERC1155" && (
          <div className="flex items-center justify-between">
            <p className="text-bold mb-1 font-bold">Quantity</p>
            <div className="flex flex-col items-end justify-end gap-1">
              <Input
                classContainer="w-24"
                placeholder="0"
                value={amount.toString()}
                onChange={(e: any) => setAmount(e.target.value)}
              />
              <p className="text-xs text-grays">
                Available: <span>{signature?.amount_sig}</span>
              </p>
            </div>
          </div>
        )}

        <div className="h-[1px] w-full bg-line"></div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-grays">You will pay:</p>
            <FormatPrice
              iconSize="sm"
              price={signature?.price}
              currency={signature?.currency}
            />
          </div>
        </div>

        <div className="h-[1px] w-full bg-line"></div>

        <Button
          title="Buy Now"
          className="w-full"
          onClick={() => {
            onHandleBuy();
          }}
        />
      </div>
    </Modal>
  );
};

export default BuyPopup;
