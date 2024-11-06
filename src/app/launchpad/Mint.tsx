"use client";
import eth from "@/assets/EthereumBadge.svg";
import useCountdown from "@/hooks/useCountdown";
import Button from "@/packages/@ui-kit/Button";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PhasesType } from "./page";
import { useAtemuContext } from "./AtemuMintProvider";
import { useAccount } from "@starknet-react/core";

interface MintProps {
  phases: PhasesType[];
}

const Mint: React.FC<MintProps> = ({ phases }) => {
  const { address } = useAccount();
  const {
    onCheckWallet,
    onMintGTD,
    isMint,
    onMintWhited,
    onMintPublic,
    isLoading,
    isLoadingChecker,
  } = useAtemuContext();
  const [isClientRendered, setIsClientRendered] = useState(false);
  const [phaseActive, setPhaseActive] = useState(3);
  const [secs, mins, hrs, days] = useCountdown(
    phases[phaseActive]?.dateTime?.toString(),
  );

  useEffect(() => {
    setIsClientRendered(true);
  }, []);

  // useEffect(() => {
  //   const updatePhase = () => {
  //     const now = new Date();
  //     let active = -1;

  //     for (let i = 0; i < phases.length; i++) {
  //       const phaseDate = phases[i].dateTime;
  //       if (now >= phaseDate) {
  //         active = i + 1;
  //       }
  //     }

  //     setPhaseActive(active);
  //   };
  //   updatePhase();

  //   const interval = setInterval(updatePhase, 1000);

  //   return () => clearInterval(interval);
  // }, [phases]);

  const handleMint = () => {
    switch (phaseActive) {
      case 1: {
        onMintGTD();
        break;
      }
      case 2: {
        onMintWhited();
        break;
      }
      case 3: {
        onMintPublic();
        break;
      }
      default: {
        // onMintPublic();
      }
    }
  };

  useEffect(() => {
    onCheckWallet(phaseActive);
  }, [phaseActive]);

  return (
    <div className="rounded-md border border-line p-4">
      <div className="border-b border-line pb-4">
        <div className="flex items-center justify-between gap-2">
          <p className="uppercase">
            {phases[phaseActive == -1 ? 0 : phaseActive - 1]?.title}
          </p>
          {isClientRendered && phaseActive != -1 ? (
            <p className="uppercase">
              Time left: {days}d {hrs}h {mins}m
            </p>
          ) : (
            <p className="uppercase">Time left: --:--:--</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <p className="text-3xl">Free Mint</p>
          </div>
          <p className="mt-2 text-grays">Limit: 1 per wallet</p>
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
        <Button
          title="Sold out"
          className=" w-full"
          onClick={() => {}}
          disabled={true}
        />


        {/* <Button
          title="Check Eligibility"
          variant="outline"
          className=" w-full"
          loading={isLoadingChecker}
          onClick={() => {
            onCheckWallet(phaseActive);
          }}
        /> */}
      </div>
    </div>
  );
};

export default Mint;
