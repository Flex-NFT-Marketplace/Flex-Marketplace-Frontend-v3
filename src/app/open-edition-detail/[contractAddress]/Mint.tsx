"use client";
import eth from "@/assets/EthereumBadge.svg";
import useCountdown from "@/hooks/useCountdown";
import Button from "@/lib/@core/Button";
import { useEffect, useState } from "react";

const Mint = () => {
  const [isClientRendered, setIsClientRendered] = useState(false);
  const [secs, mins, hrs, days] = useCountdown("2025-12-31T00:00:00");

  useEffect(() => {
    setIsClientRendered(true);
  }, []);
  return (
    <div className="border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-2xl">Price: {10}</p>
            <img className="h-5 w-5" src={eth.src} alt="" />
          </div>
          <div>
            <p className="text-sm text-[#8E8E93]">
              {1 ? 1 + " per wallet" : "Unlimited"}
            </p>
          </div>
        </div>
        <div className="flex h-fit gap-2">
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
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <Button className="w-full" title="Check whitelist eligibility" />
        <div className="flex gap-4">
          <Button
            title="Free Claim"
            className="flex-1 border-[#64D2FF] text-[#64D2FF]"
            mode="outline"
          />
          <Button
            title="Mint"
            mode="outline"
            className="flex-1 border-[#FF8AD0] text-[#FF8AD0]"
          />
        </div>
      </div>
    </div>
  );
};

export default Mint;
