"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import ethSVG from "@/assets/EthereumBadge.svg";
import background_unpack from "@/assets/social/bg-unpack.png";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Modal from "@/packages/@ui-kit/Modal";
import gsap from "gsap";
import Card from "./Card";
import { useAccount } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { addresses } from "@/services/context/address";
import { cairo, CallData, provider, RpcProvider, uint256 } from "starknet";
import { PRAGMA_VRF_FEE } from "@/constants/pragmaVrfFee";
import { IStagingNft } from "@/types/IStagingNft";
import atemu_1 from "@/assets/social/atemu_1.png";
import atemu_2 from "@/assets/social/atemu_2.png";
import atemu_3 from "@/assets/social/atemu_3.png";
import atemu_4 from "@/assets/social/atemu_4.png";
import atemu_5 from "@/assets/social/atemu_5.png";

interface IBuyPackPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  //   pack721: IStagingNft;
}
const BuyPackPopup: React.FC<IBuyPackPopupProps> = (props) => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const unpackRef = useRef<HTMLDivElement>(null);
  const buttonClaim = useRef<HTMLDivElement>(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  //   const { account } = useAccount();
  //   const { onShowToast } = useToast();
  const listSrc = [atemu_1, atemu_2, atemu_3, atemu_4, atemu_5];

  const { isOpen, toggleModal } = props;
  const [count, setCount] = useState(1);
  let unPackCount = 0;
  const countRef = useRef(count);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (countRef.current > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const handleCardClick = (index: number) => {
    unPackCount += 1;
    if (unPackCount >= 5) {
      buttonClaim.current && buttonClaim.current.classList.remove("hidden");
    }
    gsap.to(cardRefs.current[index].querySelector(".rotating-card-inner"), {
      rotateY: 180, // Nếu đang lật thì 180, không thì 0
      duration: 1,
      ease: "power1.inOut",
    });
  };

  const buy = async () => {
    toggleModal();
    // if (!account) {
    //   onShowToast("Please connect your wallet");
    //   return;
    // }
    // const provider = new RpcProvider({
    //   nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
    // });

    // const result = await account.execute([
    //   {
    //     contractAddress: addresses.Pack.address,
    //     entrypoint: "set_approval_for_all",
    //     calldata: CallData.compile({
    //       operator: addresses.Factory.address,
    //       approved: true,
    //     }),
    //   },
    //   {
    //     contractAddress: addresses.ethToken.address,
    //     entrypoint: "transfer",
    //     calldata: CallData.compile({
    //       recipient: addresses.Factory.address,
    //       amount: cairo.uint256(PRAGMA_VRF_FEE * 1e18),
    //     }),
    //   },
    //   {
    //     contractAddress: addresses.Factory.address,
    //     entrypoint: "unpack_card_collectible",
    //     calldata: CallData.compile({
    //       collectible: addresses.Collectible.address,
    //       phase_id: uint256.bnToUint256(phase_id),
    //       token_id: uint256.bnToUint256(pack721.tokenId),
    //     }), // Pass flat calldata
    //   },
    // ]);

    // const tx = await provider.waitForTransaction(result.transaction_hash);

    // if (!tx.isSuccess()) {
    //   // Hiển thị tx hash để user xem lỗi
    //   return;
    // }
    if (!unpackRef.current) return;
    unpackRef.current.classList.remove("hidden");

    setTriggerAnimation((prev) => !prev);
  };

  const claimSuccess = () => {
    unpackRef.current && unpackRef.current.classList.add("hidden");
  };

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const cards = cardRefs.current;
    const positions = [12, 31, 50, 69, 88];
    const rotations = [0, 0, 0, 0, 0];
    console.log(triggerAnimation);

    if (triggerAnimation) {
      gsap.to(".cards", {
        opacity: 1,
        zIndex: 51,
      });
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          top: "50%",
          duration: 1,
          ease: "power1.inOut",
        });
      });
      gsap.to(".main-page", {
        opacity: 1,
        duration: 0.5,
      });

      cards.forEach((card, index) => {
        gsap.to(card.querySelector(".rotating-card-inner"), {
          // rotateY: 180,
          duration: 1,
          opacity: 1,

          delay: index * 0.5,
          ease: "power1.inOut",
        });
      });
    }
  }, [triggerAnimation]);

  return (
    <>
      <Modal isShow={isOpen} hide={toggleModal}>
        <div className="flex flex-col bg-black bg-opacity-85 gap-4">
          <div className="flex items-center justify-center flex-col">
            <p className="text-2xl uppercase font-bold">buy pack</p>
            <p className="text-gray text-base leading-5">
              Account balance: 0.18 ETH
            </p>
          </div>

          <div className="flex gap-4 p-5 border border-border">
            <ImageKit
              width={96}
              height={100}
              alt=""
              src="/images/launchpad-bg.png"
              className="aspect-square w-[75px] rounded-none"
            />
            <div className="flex flex-1 flex-col gap-2 font-bold text-base leading-5 items-centers ">
              <p className="uppercase">Pack name</p>
              <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between">
                  <p className="text-gray">Price:</p>
                  <p className="text-white">0.37 ETH</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-gray">Rarity:</p>
                  <div className="text-green border-green border bg-green/15 rounded-sm uppercase px-2 py-[2px] text-[14px] leading-5">
                    Common
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-bold mb-1 font-bold">Quantity</p>
            <div className="flex flex-col items-end justify-end gap-1">
              <div className="flex items-center border px-3 py-[2px] border-border gap-[88px]">
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
          </div>

          <div className="h-[1px] w-full bg-line"></div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm">Total:</p>
              <div className="flex gap-1">
                <p>0.37</p>
                <img src={ethSVG.src} className="h-5 w-5" alt="" />
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-line"></div>
          <div className="w-full gap-2 flex">
            <Button
              onClick={() => toggleModal()}
              title="Cancel"
              className="w-full rounded-none text-white bg-none normal-case"
              variant="outline"
            />
            <Button
              onClick={() => buy()}
              title="Buy Now"
              className="w-full rounded-none bg-primary/15 border border-primary normal-case text-primary"
            />
          </div>
        </div>
      </Modal>
      <div
        ref={unpackRef}
        className="cards fixed w-screen h-screen top-0 left-0 hidden"
      >
        {triggerAnimation && (
          <ImageKit
            src={background_unpack.src}
            className={`absolute opacity-0 main-page top-0 left-0  w-screen h-full -z-[1] pointer-events-none`}
            alt=""
          />
        )}

        {listSrc.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                cardRefs.current[index] = el;
              }
            }}
            onClick={() => handleCardClick(index)} // Click để lật từng lá bài
            id={`hehe` + index}
            className={`absolute opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <Card imageSrc={_.src} />
          </div>
        ))}
        <div
          ref={buttonClaim}
          onClick={(e) => {
            e.stopPropagation();
            unpackRef.current?.classList.add("hidden");
          }}
          className="absolute top-[80%] w-full flex justify-center hidden"
        >
          <Button
            title="Claim"
            className="!w-[150px]"
            onClick={() => claimSuccess()}
          />
        </div>
      </div>
    </>
  );
};
export default BuyPackPopup;
