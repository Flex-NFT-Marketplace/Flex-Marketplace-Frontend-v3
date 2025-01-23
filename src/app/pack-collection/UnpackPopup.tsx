"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import ethSVG from "@/assets/EthereumBadge.svg";

import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Modal from "@/packages/@ui-kit/Modal";
import Card from "./Card";
import { useAccount } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { addresses } from "@/services/context/address";
import {
  cairo,
  CallData,
  Contract,
  provider,
  RpcProvider,
  uint256,
} from "starknet";
import { PRAGMA_VRF_FEE } from "@/constants/pragmaVrfFee";
import { IStagingNft } from "@/types/IStagingNft";

import { erc721Abi } from "@/constants/erc721";
import { erc1155Abi } from "@/constants/erc1155";
import { atemuFatoryABI } from "@/types/abi/atemuFatoryABI";
import { metadataUnpack } from "@/constants/nftMetadataUnpack";
import UnpackAnimation from "./UnpackAnimation";
import launchpadBg from "@/assets/launchpad-bg.png";

interface IBuyPackPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  packOpening: IStagingNft | null;
}

interface Event {
  from_address: string;
  keys: string[];
  data: string[];
}

interface Attribute {
  trait_type: string;
  value: number | string;
}

// Định nghĩa interface cho đối tượng dữ liệu (DataObject)
export interface DataObject {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: Attribute[];
}

const UnpackPopup: React.FC<IBuyPackPopupProps> = (props) => {
  const { account } = useAccount();
  const { onShowToast } = useToast();

  const { isOpen, toggleModal, packOpening } = props;
  const [count, setCount] = useState(1);

  const countRef = useRef(count);
  const [showAnimation, setShowAnimation] = useState(false);
  const [listSrcRecieved, setListSrcRecieved] = useState<DataObject[]>([]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (countRef.current > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  function filterObjects(objects: Event[]): Event[] {
    return objects.filter((obj) => {
      // Check if 'keys' exists and has at least one element
      if (obj.keys && obj.keys.length > 0) {
        // Check if the first key starts with '0x182'
        return obj.keys[0].startsWith("0x182");
      }
      return false;
    });
  }

  function extractFirstDataAsNumber(filteredEvents: Event[]): number[] {
    return filteredEvents.map((event) => {
      if (event.data.length === 0) {
        console.warn(
          `Sự kiện từ địa chỉ ${event.from_address} không có dữ liệu.`
        );
        return NaN; // Trả về NaN nếu không có dữ liệu
      }

      const data0 = event.data[0];
      // Kiểm tra xem data0 có phải là chuỗi hex hợp lệ không
      if (typeof data0 === "string" && data0.startsWith("0x")) {
        const numberValue = parseInt(data0, 16);
        if (isNaN(numberValue)) {
          console.warn(
            `Giá trị data[0] "${data0}" không hợp lệ cho sự kiện từ địa chỉ ${event.from_address}.`
          );
          return NaN;
        }
        return numberValue;
      } else {
        console.warn(
          `Giá trị data[0] "${data0}" không phải là chuỗi hex hợp lệ cho sự kiện từ địa chỉ ${event.from_address}.`
        );
        return NaN;
      }
    });
  }

  function getObjectsByTokenIds(
    tokenIds: number[],
    data: DataObject[]
  ): DataObject[] {
    // Tạo một bản đồ để tra cứu nhanh các đối tượng theo TokenID
    const tokenMap: Map<number, DataObject> = new Map();

    data.forEach((obj) => {
      // Tìm giá trị TokenID trong thuộc tính attributes
      const tokenIdAttr = obj.attributes.find(
        (attr) => attr.trait_type === "TokenID"
      );
      if (tokenIdAttr && typeof tokenIdAttr.value === "number") {
        tokenMap.set(tokenIdAttr.value, obj);
      }
    });

    // Lấy các đối tượng theo thứ tự của tokenIds
    const result: DataObject[] = tokenIds
      .map((id) => tokenMap.get(id))
      .filter((obj): obj is DataObject => obj !== undefined);

    return result;
  }

  const open = async () => {
    toggleModal();
    if (!account) {
      onShowToast("Please connect your wallet");
      return;
    }

    // if (!packOpening) {
    //   onShowToast("Please select a pack");
    //   return;
    // }

    // const provider = new RpcProvider({
    //   nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
    // });

    const provider = new RpcProvider({
      nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7",
    });

    // https://free-rpc.nethermind.io/sepolia-juno/v0_7

    const ATEMU_PACK_ADDRESS_TESTNET =
      "0x017B1A4256932F9105696550438d2ce5c0D4d4378029aD9c8e8804ff5a958230";
    const ATEMU_COLLECTION_FACTORY_TESTNET =
      "0x02A64600CdC15F9a3d7376582f928AE85B43dD5880CaEf55C73418267dAf44c2";
    const ATEMU_COLLECTION_SAMPLE_TESTNET =
      "0x01b5758978572e24E9A8FB87C37F75F50787b3557C1551D03Fc561F9d24a8d30";
    try {
      const result = await account.execute([
        {
          contractAddress: ATEMU_PACK_ADDRESS_TESTNET,
          entrypoint: "set_approval_for_all",
          calldata: CallData.compile({
            operator: ATEMU_COLLECTION_FACTORY_TESTNET,
            approved: true,
          }),
        },
        {
          contractAddress: ATEMU_COLLECTION_FACTORY_TESTNET,
          entrypoint: "open_pack",
          calldata: CallData.compile({
            pack_address: ATEMU_PACK_ADDRESS_TESTNET,
            // token_id: cairo.uint256(packOpening.tokenId),
            token_id: cairo.uint256(34),
          }),
        },
      ]);

      const tx = await provider.waitForTransaction(result.transaction_hash);

      if (!tx.isSuccess()) {
        console.log("error", tx);

        return;
      }

      console.log(tx, tx.events);

      const filteredEvents = filterObjects(tx.events);

      const idReceived: number[] = extractFirstDataAsNumber(filteredEvents);

      const dataObjects = getObjectsByTokenIds(idReceived, metadataUnpack);

      console.log(filteredEvents, idReceived, dataObjects);

      setListSrcRecieved(dataObjects);
      setShowAnimation(true);
    } catch (error: any) {
      console.log(error);

      onShowToast(error.message);
      return;
    }
  };

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  return (
    <>
      {showAnimation && (
        <UnpackAnimation
          listSrc={listSrcRecieved}
          hide={() => setShowAnimation(false)}
        />
      )}
      <Modal isShow={isOpen} hide={toggleModal}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center flex-col">
            <p className="text-2xl uppercase font-bold">open pack</p>
            {/* <p className="text-gray text-base leading-5">
              Account balance: 0.18 ETH
            </p> */}
          </div>

          <div className="flex gap-4 p-5 border border-border">
            <ImageKit
              width={96}
              height={100}
              alt=""
              src={launchpadBg.src}
              className="aspect-square w-[75px] rounded-none"
            />
            <div className="flex flex-1 flex-col gap-2 font-bold text-base leading-5 items-centers ">
              <p className="uppercase">{packOpening?.name}</p>
              <div className="flex flex-col gap-2">
                {/* <div className="w-full flex justify-between">
                  <p className="text-gray">Price:</p>
                  <p className="text-white">0.37 ETH</p>
                </div> */}
                <div className="w-full flex justify-between">
                  <p className="text-gray">Rarity:</p>
                  <div className="text-green border-green border bg-green/15 rounded-sm uppercase px-2 py-[2px] text-[14px] leading-5">
                    Common
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <p className="text-bold mb-1 font-bold">Quantity</p>
            <div className="flex flex-col items-end justify-end gap-1">
              <div className="flex items-center border px-3 py-[2px] border-border gap-[50px]">
                <Button
                  className="w-fit h-fit !p-1"
                  variant="icon"
                  onClick={handleDecrement}
                >
                  <IoIosRemove />
                </Button>
                <p>{count}</p>
                <Button
                  className="w-fit h-fit !p-1"
                  variant="icon"
                  onClick={handleIncrement}
                >
                  <IoIosAdd />
                </Button>
              </div>
            </div>
          </div> */}

          {/* <div className="h-[1px] w-full bg-line"></div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm">Total:</p>
              <div className="flex gap-1">
                <p>0.37</p>
                <img src={ethSVG.src} className="h-5 w-5" alt="" />
              </div>
            </div>
          </div> */}

          <div className="h-[1px] w-full bg-line"></div>
          <div className="w-full gap-2 flex">
            <Button
              onClick={() => toggleModal()}
              title="Cancel"
              className="w-full rounded-none text-white bg-none normal-case"
              variant="outline"
            />
            <Button
              onClick={() => open()}
              title="Open now"
              className="w-full rounded-none bg-primary/15 border border-primary normal-case text-primary"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UnpackPopup;
