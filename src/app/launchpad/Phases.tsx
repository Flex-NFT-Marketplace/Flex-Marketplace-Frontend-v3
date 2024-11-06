"use client";
import eth from "@/assets/EthereumBadge.svg";
import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PhasesType } from "./page";

interface PhasesProps {
  phases: PhasesType[];
}

const Phases: React.FC<PhasesProps> = ({ phases }) => {
  const [phaseActive, setPhaseActive] = useState(3);

  // useEffect(() => {
  //   const updatePhase = () => {
  //     const now = new Date();
  //     let active = 0;

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

  return (
    <div className="mt-8 flex flex-col gap-6">
      {phases.map((phase: PhasesType, index: number) => {
        return (
          <div key={index} className={`flex items-center gap-8 max-md:gap-2`}>
            <div className="relative flex h-full items-center">
              <FaRegCircleCheck
                className={`text-2xl ${phaseActive == index + 1 ? "animate-pulse text-primary" : "text-grays"}`}
              />
              {index != phases.length - 1 && (
                <div className="bg-border absolute left-1/2 top-1/2 mt-3 h-full w-[1px] -translate-x-1/2"></div>
              )}
            </div>
            <div className="flex flex-1 items-center justify-between gap-2 rounded border border-line p-4">
              <div>
                <p className={`${phaseActive == index + 1 && "text-primary"}`}>
                  {phase.title}
                </p>
                <p className="mt-2">{phase.timeString}</p>
              </div>
              <div>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-end text-grays">
                    Price: <span className="text-white">{phase.price}</span>
                  </p>
                </div>
                <p className="mt-2 text-end text-grays">
                  Limit: <span className="text-white">{phase.limit}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Phases;
