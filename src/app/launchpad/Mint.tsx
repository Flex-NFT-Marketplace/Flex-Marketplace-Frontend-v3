"use client";
import eth from "@/assets/EthereumBadge.svg";
import useCountdown from "@/hooks/useCountdown";
import Button from "@/lib/@core/Button";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Mint = () => {
  const [isClientRendered, setIsClientRendered] = useState(false);
  const [secs, mins, hrs, days] = useCountdown("2025-12-31T00:00:00");

  useEffect(() => {
    setIsClientRendered(true);
  }, []);
  return (
    <div className="border border-line p-4">
      <div className="pb-4 border-b border-line">
        <div className="flex justify-between items-center">
          <p className="uppercase">Whitelist mint</p>
          <p className="uppercase">Time left: 1d 23h 32m</p>
        </div>
        <div className="mt-4">
          <div className="flex gap-2 items-center">
            <p className="text-3xl">{`<0,0004`}</p>
            <img className="h-5 w-5" src={eth.src} alt="" />
          </div>
          <p className="text-grays mt-2">Limit: 1 per wallet</p>
        </div>
        {/* <div>
          <div className="flex  items-center gap-1 justify-between">
            <p className="">Whitelist mint</p>
            <p>Time left: 1d 23h 32m</p>
            <img className="h-5 w-5" src={eth.src} alt="" />
          </div>
          <div>
            <p className="text-sm text-[#8E8E93]">
              {1 ? 1 + " per wallet" : "Unlimited"}
            </p>
          </div>
        </div> */}
        {/* <div className="flex h-fit gap-2">
          <div className="flex aspect-square h-[46px] flex-col items-center justify-center rounded border border-line">
            <p className="text-center">{isClientRendered && days}</p>
            <p className=" text-xs text-[#8E8E93]">DAYS</p>
          </div>
          <div className="flex aspect-square h-[46px] flex-col items-center justify-center rounded border border-line">
            <p className="text-center">{isClientRendered && hrs}</p>
            <p className=" text-xs text-[#8E8E93]">HRS</p>
          </div>
          <div className="flex aspect-square h-[46px] flex-col items-center justify-center rounded border border-line">
            <p className="text-center">{isClientRendered && mins}</p>
            <p className=" text-xs text-[#8E8E93]">MINS</p>
          </div>
          <div className="flex aspect-square h-[46px] flex-col items-center justify-center rounded border border-line">
            <p className="text-center">{isClientRendered && secs}</p>
            <p className=" text-xs text-[#8E8E93]">SECS</p>
          </div>
        </div> */}
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div>
          <p className="text-grays">Total:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-2xl">{`<0,0004`}</p>
              <img className="h-5 w-5" src={eth.src} alt="" />
            </div>
            <div className="flex justify-between items-center border border-line rounded px-5 py-2">
              <FaMinus className="h-2 cursor-pointer" />
              <div className="w-20 text-center">1</div>
              <FaPlus className="h-2 cursor-pointer" />
            </div>
          </div>
        </div>
        <Button title="Mint" className="border-[#FF8AD0] text-[#FF8AD0]" />
      </div>
    </div>
  );
};

export default Mint;
