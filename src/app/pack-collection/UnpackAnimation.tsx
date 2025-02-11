import ImageKit from "@/packages/@ui-kit/Image";
import { useEffect, useRef, useState } from "react";
import background_unpack from "@/assets/social/bg-unpack.png";
import Card from "./Card";
import Button from "@/packages/@ui-kit/Button";
import { DataObject } from "./UnpackPopup";
import gsap from "gsap";

interface UnpackAnimationProps {
  listSrc: DataObject[];
  hide: () => void;
}

const UnpackAnimation: React.FC<UnpackAnimationProps> = (props) => {
  const { listSrc, hide } = props;
  const unpackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  //   const [triggerAnimation, setTriggerAnimation] = useState(false);
  //   const listSrc = [atemu_1, atemu_2, atemu_3, atemu_4, atemu_5];
  const [clickedCards, setClickedCards] = useState<boolean[]>(
    Array(listSrc.length).fill(false)
  );
  const [unPackCount, setUnPackCount] = useState(0);
  const buttonClaim = useRef<HTMLDivElement>(null);

  const resetCards = () => {
    setClickedCards(Array(listSrc.length).fill(false));
  };

  const claimSuccess = () => {
    // unpackRef.current && unpackRef.current.classList.add("hidden");
    hide();
  };

  const handleCardClick = (index: number) => {
    if (clickedCards[index]) return;
    setClickedCards((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setUnPackCount((prev) => prev + 1);
    if (unPackCount >= listSrc.length - 1) {
      buttonClaim.current && buttonClaim.current.classList.remove("hidden");
    }
    gsap.to(cardRefs.current[index].querySelector(".rotating-card-inner"), {
      rotateY: 180,
      duration: 1,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    const cards = cardRefs.current;
    const positions = [12, 31, 50, 69, 88];
    const rotations = [0, 0, 0, 0, 0];

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
  }, []);

  return (
    <div ref={unpackRef} className="cards fixed w-screen h-screen top-0 left-0">
      <ImageKit
        src={background_unpack.src}
        className={`absolute opacity-0 main-page top-0 left-0  w-screen h-full -z-[1] pointer-events-none`}
        alt=""
      />

      {listSrc.map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              cardRefs.current[index] = el;
            }
          }}
          onClick={() => handleCardClick(index)} // Click để lật từng lá bài
          className={`absolute opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <Card imageSrc={_.imageOffChain?.src} />
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
          onClick={() => {
            claimSuccess();
            resetCards();
          }}
        />
      </div>
    </div>
  );
};

export default UnpackAnimation;
