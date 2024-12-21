"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import ethSVG from "@/assets/EthereumBadge.svg";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Modal from "@/packages/@ui-kit/Modal";
import gsap from "gsap";
import Card from "./Card";
interface IBuyPackPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
}
const BuyPackPopup: React.FC<IBuyPackPopupProps> = (props) => {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const { isOpen, toggleModal } = props;
  const [count, setCount] = useState(1);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);
  useEffect(() => {
    const cards = cardRefs.current;
    const positions = [18, 34, 50, 66, 82];
    const rotations = [0, 0, 0, 0, 0];

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
  const open = () => {
    const cards = document.querySelector(".cards");
    cards?.classList.remove("hidden");
    setTriggerAnimation((prev) => !prev);
  };
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (countRef.current > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const handleCardClick = (index: number) => {
    gsap.to(cardRefs.current[index].querySelector(".rotating-card-inner"), {
      rotateY: 180,
      duration: 1,
      ease: "power1.inOut",
    });
  };
  return (
    <>
      <Modal isShow={isOpen} hide={toggleModal}>
        <div className="flex flex-col bg-black bg-opacity-85 gap-4">
          <div className="flex items-center justify-center flex-col">
            <p className="text-2xl uppercase font-bold">
              Purchased successfully
            </p>
            <p className="text-gray text-base leading-5">
              Account balance: 0.18 ETH
            </p>
          </div>

          <div className="flex gap-4 p-5 border border-border">
            <ImageKit
              width={96}
              height={100}
              alt=""
              src=""
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

          <div className="flex items-center font-bold text-base leading-5 justify-between">
            <p className="mb-1 ">Quantity</p>
            <p className="">2</p>
          </div>

          <div className="h-[1px] w-full bg-line"></div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm">Total:</p>
              <div className="flex gap-1">
                <p>0.001</p>
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
              onClick={() => open()}
              title="Open now"
              className="w-full rounded-none bg-primary/15 border border-primary normal-case text-primary"
            />
          </div>
        </div>
      </Modal>
      <div
        className={`cards fixed w-screen h-screen top-0 left-0  ${triggerAnimation ? "" : "hidden"}`}
      >
        {triggerAnimation && (
          <img
            src="/main page.png"
            className="absolute opacity-0 main-page top-0 left-0 w-full h-full -z-[1]"
            alt=""
          />
        )}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) {
                cardRefs.current[index] = el;
              }
            }}
            onClick={() => handleCardClick(index)}
            className="absolute opacity-0  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Card imageSrc="" />
          </div>
        ))}
      </div>
    </>
  );
};
export default BuyPackPopup;
