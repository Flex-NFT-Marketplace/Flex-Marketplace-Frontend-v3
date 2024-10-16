"use client";

import { INft } from "@/types/INft";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ISignature } from "@/types/ISignature";
import useBidActionNft from "@/services/context/useBidActionNft";
import FormatPrice from "../FormatPrice";
import { IoClose } from "react-icons/io5";
import Button from "@/packages/@ui-kit/Button";
import Modal from "@/packages/@ui-kit/Modal";
import ImageKit from "@/packages/@ui-kit/Image";

dayjs.extend(utc);

interface IBuyPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  nft?: INft;
  signature?: ISignature;
  schema?: string;
  onReload: () => void;
}

const UnBidPopup: React.FC<IBuyPopupProps> = (props) => {
  const { isOpen, toggleModal, nft, signature, onReload, schema } = props;
  const { onCancelOrder } = useBidActionNft();

  const onHandleUnList = async () => {
    try {
      await onCancelOrder(signature?._id as string);
      toggleModal();
      onReload();
    } catch (error) {
   
    }
  };

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex  flex-col gap-4 ">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">UnBid NFT</p>
          <Button icon={<IoClose />} variant="icon" onClick={toggleModal} />
        </div>

        <div className="flex items-center gap-4">
          <ImageKit
            width={100}
            height={100}
            alt=""
            src={nft?.image_url}
            className="aspect-square w-[75px] rounded-md"
          />
          <div className="flex flex-1 flex-col">
            <p className="font-bold">{nft?.name}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between font-normal ">
            <p className="font-bold uppercase text-grays ">Price list:</p>
            <FormatPrice
              price={signature?.price}
              className="text-lg text-primary"
              currency={signature?.currency}
            />
          </div>
          <div className="flex justify-between">
            <div className="font-normal">
              <p className="font-bold uppercase text-grays ">Quantity</p>
            </div>
            <p>x{signature?.amount}</p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-line"></div>

        <Button
          title="Cancel Bid"
          variant="outline"
          className="w-full border-cancel text-cancel"
          onClick={() => {
            onHandleUnList();
          }}
        />
      </div>
    </Modal>
  );
};

export default UnBidPopup;
