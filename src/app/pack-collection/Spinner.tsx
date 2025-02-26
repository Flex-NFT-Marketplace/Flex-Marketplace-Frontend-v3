import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import React, { useRef } from "react";
import ethIcon from "@/assets/EthereumBadge.svg";
import bg_rewards from "@/assets/bg-reward.png";
import animateCongrats from "@/assets/congratulations.json";
import Lottie from "lottie-react";
import { RiArrowUpSFill } from "react-icons/ri";
import question_mark from "@/assets/question_mark.svg";
import { toast } from "react-toastify";
interface SpinerItemProps {
  reward: number;
  isSpecial?: boolean;
}

const Spinner = () => {
  const [showReward, setShowReward] = React.useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const order = [0, 0.014, 0.02, 0.00001, 10, 3, 8, 1, 6, 11, 4, 9, 2];
  const [target, setTarget] = React.useState<number | string>(10);
  const spinDuration = 10; // 6s
  const cardWidth = 100;
  const margin = 3;

  const spinWheel = (targetGift: number | undefined | string) => {
    if (!targetGift) {
      toast("Please enter a number");
      return;
    }
    if (typeof targetGift === "string") {
      toast("Please enter a valid number");
      return;
    }

    targetGift = Number(targetGift);

    const position = order.indexOf(targetGift);
    if (position === -1) {
      toast("Error");
      return;
    }
    const rows = 12; // don't change this
    const card = cardWidth + margin * 2;
    let landingPosition = rows * order.length * card + position * card;
    const randomize = Math.floor(Math.random() * cardWidth) - cardWidth / 2;
    landingPosition = landingPosition + randomize;
    const object = {
      x: Math.floor(Math.random() * 50) / 100,
      y: Math.floor(Math.random() * 20) / 100,
    };

    if (wheelRef.current) {
      wheelRef.current.style.transitionTimingFunction = `cubic-bezier(0, ${object.x}, ${object.y}, 1)`;
      wheelRef.current.style.transitionDuration = spinDuration + "s";
      wheelRef.current.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;

      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transitionTimingFunction = "";
          wheelRef.current.style.transitionDuration = "";

          const resetTo = -(position * card + randomize);
          wheelRef.current.style.transform = `translate3d(${resetTo}px, 0px, 0px)`;
          setShowReward(true);
        }
      }, spinDuration * 1000);
    }
  };

  const SpinItems = () => {
    const SpinerItem: React.FC<SpinerItemProps> = ({
      reward,
      isSpecial = false,
    }) => {
      return (
        <div
          style={{
            width: cardWidth,
            margin: margin + "px",
            backgroundImage: isSpecial
              ? "linear-gradient(to right, rgba(255, 231, 32, 0.15) 10%, rgba(255, 231, 32, 0.15) 100%)"
              : "linear-gradient(to right, rgba(255, 255, 255, 0.5) 10%, white 50%, rgba(255, 255, 255, 0.5) 100%)",
          }}
          className={`${isSpecial ? "border-white/40" : "border-transparent"} grid place-items-center border-2 p-[1px] text-xl font-bold`}
        >
          <div
            className={`flex h-full w-full flex-col items-center justify-center gap-1 py-8 ${isSpecial ? "bg-gradient-to-b from-[#FFE72026] to-[#CCB811]" : "bg-[#232733]"}`}
          >
            <div
              className={`grid aspect-square h-14 w-14 place-items-center border border-dashed border-grays ${isSpecial ? "bg-primary" : "bg-white"}`}
            >
              {isSpecial ? (
                <ImageKit
                  src={question_mark}
                  alt="ethIcon"
                  className="h-2/3 w-auto"
                />
              ) : (
                <ImageKit
                  src={ethIcon.src}
                  alt="ethIcon"
                  className="h-10 w-10"
                />
              )}
            </div>
            <p className="whitespace-nowrap text-xs">
              {isSpecial ? "Special" : `${reward} ETH`}
            </p>
          </div>
        </div>
      );
    };
    return (
      <>
        {order
          .slice(Math.ceil(order.length / 2), order.length)
          .map((item, index) => {
            return (
              <SpinerItem key={index} reward={item} isSpecial={item == 10} />
            );
          })}
        <SpinerItem reward={order[0]} isSpecial={order[0] == 10} />
        {order.slice(1, Math.ceil(order.length / 2)).map((item, index) => {
          return (
            <SpinerItem key={index} reward={item} isSpecial={item == 10} />
          );
        })}
      </>
    );
  };

  return (
    <>
      {showReward && (
        <div className="fixed left-0 top-0 z-10 grid h-full w-full animate-fade place-items-center">
          <div className="pointer-events-none fixed left-0 top-0 -z-[1] h-screen w-screen bg-black/70"></div>
          <div className="flex flex-col justify-center gap-10">
            <p className="text-3xl font-bold">You have won</p>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255, 255, 255, 0.5) 10%, white 50%, rgba(255, 255, 255, 0.5) 100%)",
              }}
              className="grid place-items-center p-[1px] text-xl font-bold"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[#232733] py-10">
                <div className="grid aspect-square place-items-center border border-dashed border-grays bg-white p-4">
                  <ImageKit
                    src={ethIcon.src}
                    alt="ethIcon"
                    className="h-10 w-10"
                  />
                </div>
                <p className="whitespace-nowrap text-xl font-bold">
                  {target} ETH
                </p>
              </div>
            </div>
            <p className="text-2xl font-bold">Congratulations</p>
            <Button
              onClick={() => setShowReward(false)}
              title="Claim"
              variant="primary"
              className="w-full flex-1"
            />
          </div>
          <Lottie
            animationData={animateCongrats}
            className="pointer-events-none absolute inset-0 -z-[1] h-screen w-screen"
          />
        </div>
      )}

      <div className="relative mx-auto flex w-full justify-center overflow-hidden py-[60px]">
        <RiArrowUpSFill className="absolute bottom-5 left-1/2 z-[1] -translate-x-1/2 text-[50px]" />

        <div ref={wheelRef} className="flex">
          <div className="flex">
            {/* don't change this */}
            {[...Array(29)].map((_, index) => {
              return <SpinItems key={index} />;
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col gap-4">
        <div className="flex gap-3 items-center font-bold text-base leading-5 text-gray uppercase ">
          <p className="">Available ticket:</p>
          <p>0</p>
        </div>
        <Button
          onClick={() => spinWheel(target)}
          className="!w-[220px] border-primary text-primary"
          variant="outline"
          title="Spin"
        />
      </div>
    </>
  );
};

export default Spinner;
