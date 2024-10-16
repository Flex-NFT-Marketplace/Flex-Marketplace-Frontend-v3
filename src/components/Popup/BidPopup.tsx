"use client";

import { INft } from "@/types/INft";
import { useEffect, useState } from "react";
import { ConfigProvider, DatePicker, Space, theme } from "antd";
import ETHSVG from "@/assets/EthereumBadge.svg";
import STRKSVG from "@/assets/strk.svg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useAccount } from "@starknet-react/core";
import useListActionNft, {
  ActionStatus,
} from "@/services/context/useListActionNft";

import type { MenuProps } from "antd";
import { ICollection } from "@/types/ICollection";
import useBidActionNft from "@/services/context/useBidActionNft";
import FormatPrice from "../FormatPrice";
import Modal from "@/packages/@ui-kit/Modal";
import Button from "@/packages/@ui-kit/Button";
import { IoClose } from "react-icons/io5";
import Input from "@/packages/@ui-kit/Input";
import Dropdown from "@/packages/@ui-kit/Dropdown";
import DatePickup from "@/packages/@ui-kit/DatePickup";
import Image from "next/image";
import ImageKit from "@/packages/@ui-kit/Image";

dayjs.extend(utc);

interface ISelPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  nftData?: INft;
  onReload: () => void;
  schema: string;
}

const items = [
  {
    id: 1,
    title: "ETH",
    value: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    icon: <Image src={ETHSVG} alt="" width={12} height={12} />,
  },
  {
    id: 2,
    title: "STRK",
    value: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    icon: <Image src={STRKSVG} alt="" width={12} height={12} />,
  },
];

const BidPopup: React.FC<ISelPopupProps> = (props) => {
  const { address } = useAccount();
  const { isOpen, toggleModal, nftData, onReload, schema } = props;
  const [balance, setBalance] = useState<number>(1);
  const [currencySelected, setCurrencySelected] = useState(items[0]);

  const { handleApproveBid } = useBidActionNft();

  const [timeEnd, setTimeEnd] = useState(dayjs().utc().add(30, "day"));
  const [isError, setIsError] = useState(false);

  const [price, setPrice] = useState<any>(1);
  const [amount, setAmount] = useState<number>(1);
  const [marketFee, setMarketFee] = useState<number>(0);
  const [creatorFee, setCreatorFee] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const _price = parseFloat(price.toString());
    if (_price < 0 || amount < 1 || !_price || !amount || amount > balance) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [price, amount]);

  useEffect(() => {
    let marketFeeTemp = price * amount * 0.015;
    let creatorFeeTemp = price * amount * 0.05;

    setMarketFee(marketFeeTemp);
    setCreatorFee(creatorFeeTemp);
    setReceiveAmount(price * amount);
  }, [price, amount]);

  const onClickBtn = async () => {
    setLoading(true);
    if (isError) {
      setLoading(false);
      return;
    }

    await handleApproveBid(
      timeEnd.unix(),
      price,
      amount,
      nftData?.contract_address || "",
      nftData?.token_id || "",
      currencySelected.value,
    );

    toggleModal();
    onReload();
    setLoading(false);
  };

  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEnd(date.utc());
    }
  };

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex  flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Bid NFT</p>
          <Button icon={<IoClose />} variant="icon" onClick={toggleModal} />
        </div>

        <div className="flex items-center gap-4">
          <ImageKit
            width={100}
            height={100}
            alt=""
            src={nftData?.image_url}
            className="aspect-square w-[75px] rounded-md"
          />
          <div className="flex flex-1 flex-col">
            <p className="font-bold">{nftData?.name}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-bold mb-1 font-bold text-grays">
              Place your bid
            </p>
          </div>
          <div className="flex gap-1">
            <Dropdown
              className="min-w-20"
              itemsUI={items}
              defaultValue={currencySelected}
              onSelected={(index) => setCurrencySelected(items[index])}
            />
            <Input
              classContainer="flex-1"
              placeholder="0"
              type="number"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {schema == "ERC1155" && (
          <div className="flex items-center justify-between">
            <p className="text-bold mb-1 font-bold text-grays">Quantity</p>
            <Input
              classContainer="w-24"
              placeholder="0"
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-bold mb-1 font-bold text-grays">Duration</p>
          <DatePickup timeEnd={timeEnd} handleDateChange={handleDateChange} />
        </div>

        <div className="h-[1px] w-full bg-line"></div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between ">
            <p className="  text-grays">You will Pay:</p>
            <FormatPrice
              price={receiveAmount}
              className="text-lg font-normal text-primary"
              currency={currencySelected.value}
            />
          </div>
        </div>

        <div className="h-[1px] w-full bg-line"></div>

        {isError && (
          <p className="text-red-600">* Please fill in the information above</p>
        )}

        <div>
          <p className="">1. Complete Bidding</p>
        </div>

        <Button
          title="Place bid"
          className="w-full"
          variant="secondary"
          loading={loading}
          onClick={() => onClickBtn()}
        />
      </div>
    </Modal>
  );
};

export default BidPopup;
