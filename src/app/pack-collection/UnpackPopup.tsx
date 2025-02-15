"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";

import { useEffect, useRef, useState } from "react";
import Modal from "@/packages/@ui-kit/Modal";
import { useAccount } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { cairo, CallData, RpcProvider } from "starknet";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { metadataUnpack } from "@/constants/nftMetadataUnpack";
import UnpackAnimation from "./UnpackAnimation";
import launchpadBg from "@/assets/launchpad-bg.png";

// import 50 images
import image1 from "@/assets/Atemu_Collection_Images/1.png";
import image2 from "@/assets/Atemu_Collection_Images/2.png";
import image3 from "@/assets/Atemu_Collection_Images/3.png";
import image4 from "@/assets/Atemu_Collection_Images/4.png";
import image5 from "@/assets/Atemu_Collection_Images/5.png";
import image6 from "@/assets/Atemu_Collection_Images/6.png";
import image7 from "@/assets/Atemu_Collection_Images/7.png";
import image8 from "@/assets/Atemu_Collection_Images/8.png";
import image9 from "@/assets/Atemu_Collection_Images/9.png";
import image10 from "@/assets/Atemu_Collection_Images/10.png";
import image11 from "@/assets/Atemu_Collection_Images/11.png";
import image12 from "@/assets/Atemu_Collection_Images/12.png";
import image13 from "@/assets/Atemu_Collection_Images/13.png";
import image14 from "@/assets/Atemu_Collection_Images/14.png";
import image15 from "@/assets/Atemu_Collection_Images/15.png";
import image16 from "@/assets/Atemu_Collection_Images/16.png";
import image17 from "@/assets/Atemu_Collection_Images/17.png";
import image18 from "@/assets/Atemu_Collection_Images/18.png";
import image19 from "@/assets/Atemu_Collection_Images/19.png";
import image20 from "@/assets/Atemu_Collection_Images/20.png";
import image21 from "@/assets/Atemu_Collection_Images/21.png";
import image22 from "@/assets/Atemu_Collection_Images/22.png";
import image23 from "@/assets/Atemu_Collection_Images/23.png";
import image24 from "@/assets/Atemu_Collection_Images/24.png";
import image25 from "@/assets/Atemu_Collection_Images/25.png";
import image26 from "@/assets/Atemu_Collection_Images/26.png";
import image27 from "@/assets/Atemu_Collection_Images/27.png";
import image28 from "@/assets/Atemu_Collection_Images/28.png";
import image29 from "@/assets/Atemu_Collection_Images/29.png";
import image30 from "@/assets/Atemu_Collection_Images/30.png";
import image31 from "@/assets/Atemu_Collection_Images/31.png";
import image32 from "@/assets/Atemu_Collection_Images/32.png";
import image33 from "@/assets/Atemu_Collection_Images/33.png";
import image34 from "@/assets/Atemu_Collection_Images/34.png";
import image35 from "@/assets/Atemu_Collection_Images/35.png";
import image36 from "@/assets/Atemu_Collection_Images/36.png";
import image37 from "@/assets/Atemu_Collection_Images/37.png";
import image38 from "@/assets/Atemu_Collection_Images/38.png";
import image39 from "@/assets/Atemu_Collection_Images/39.png";
import image40 from "@/assets/Atemu_Collection_Images/40.png";
import image41 from "@/assets/Atemu_Collection_Images/41.png";
import image42 from "@/assets/Atemu_Collection_Images/42.png";
import image43 from "@/assets/Atemu_Collection_Images/43.png";
import image44 from "@/assets/Atemu_Collection_Images/44.png";
import image45 from "@/assets/Atemu_Collection_Images/45.png";
import image46 from "@/assets/Atemu_Collection_Images/46.png";
import image47 from "@/assets/Atemu_Collection_Images/47.png";
import image48 from "@/assets/Atemu_Collection_Images/48.png";
import image49 from "@/assets/Atemu_Collection_Images/49.png";
import image50 from "@/assets/Atemu_Collection_Images/50.png";
import { StaticImageData } from "next/image";
import LoadingOverlay from "./LoadingOverlay";

interface IBuyPackPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  packOpening: IStagingNftResponse;
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
  image: string;
  name: string;
  attributes: Attribute[];
  imageOffChain?: StaticImageData;
}

const UnpackPopup: React.FC<IBuyPackPopupProps> = (props) => {
  const { account } = useAccount();
  const { onShowToast } = useToast();

  const { isOpen, toggleModal, packOpening } = props;
  const [count, setCount] = useState(1);
  const [loadingOpenPack, setLoadingOpenPack] = useState(false);

  const countRef = useRef(count);
  const [showAnimation, setShowAnimation] = useState(false);
  const [listSrcRecieved, setListSrcRecieved] = useState<DataObject[]>([]);
  const [listImagesOffChain, setListImagesOffChain] = useState<
    StaticImageData[]
  >([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image34,
    image35,
    image36,
    image37,
    image38,
    image39,
    image40,
    image41,
    image42,
    image43,
    image44,
    image45,
    image46,
    image47,
    image48,
    image49,
    image50,
  ]);

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
    const dataReceived = tokenIds.map((id) => {
      data[id - 1].imageOffChain = listImagesOffChain[id - 1];
      return data[id - 1];
    });
    console.log(dataReceived);

    return dataReceived;
  }

  const open = async () => {
    toggleModal();
    if (!account) {
      onShowToast("Please connect your wallet");
      return;
    }

    if (!packOpening) {
      onShowToast("Please select a pack");
      return;
    }

    const provider = new RpcProvider({
      nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
    });

    // const provider = new RpcProvider({
    //   nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7",
    // });

    // https://free-rpc.nethermind.io/sepolia-juno/v0_7

    const ATEMU_PACK_ADDRESS_TESTNET =
      "0x017B1A4256932F9105696550438d2ce5c0D4d4378029aD9c8e8804ff5a958230";
    const ATEMU_PACK_ADDRESS_MAINNET =
      "0x4d6ccb91e90da63ab5c74841bc68cbbc0da6d221770aecf4d70d02b6bf41549";

    const ATEMU_COLLECTION_FACTORY_TESTNET =
      "0x02A64600CdC15F9a3d7376582f928AE85B43dD5880CaEf55C73418267dAf44c2";
    const ATEMU_COLLECTION_FACTORY_MAINNET =
      "0x63543acf69e059d989b5ebbca515a613be78f7152f525ecad50954e96179998";

    const ATEMU_COLLECTION_SAMPLE_TESTNET =
      "0x01b5758978572e24E9A8FB87C37F75F50787b3557C1551D03Fc561F9d24a8d30";

    try {
      setLoadingOpenPack(true);
      const result = await account.execute([
        {
          contractAddress: ATEMU_PACK_ADDRESS_MAINNET,
          entrypoint: "set_approval_for_all",
          calldata: CallData.compile({
            operator: ATEMU_COLLECTION_FACTORY_MAINNET,
            approved: true,
          }),
        },
        {
          contractAddress: ATEMU_COLLECTION_FACTORY_MAINNET,
          entrypoint: "open_pack",
          calldata: CallData.compile({
            pack_address: ATEMU_PACK_ADDRESS_MAINNET,
            token_id: cairo.uint256(packOpening.nftData.tokenId),
          }),
        },
      ]);

      const tx = await provider.waitForTransaction(result.transaction_hash);

      if (!tx.isSuccess()) {
        console.log("error", tx);

        return;
      }

      const filteredEvents = filterObjects(tx.events);

      const idReceived: number[] = extractFirstDataAsNumber(filteredEvents);

      const dataObjects = getObjectsByTokenIds(idReceived, metadataUnpack);

      console.log(idReceived, dataObjects);

      setListSrcRecieved(dataObjects);
      setShowAnimation(true);
    } catch (error: any) {
      console.log(error);

      onShowToast(error.message);
      return;
    } finally {
      setLoadingOpenPack(false);
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
      <LoadingOverlay isLoading={loadingOpenPack} />
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
              <p className="">
                {packOpening?.nftData?.nftCollection?.name} #
                {packOpening?.nftData?.tokenId}
              </p>
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
