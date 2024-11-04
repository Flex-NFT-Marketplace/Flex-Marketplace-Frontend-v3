"use client";
import eth from "@/assets/EthereumBadge.svg";
import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PhasesType } from "./page";

interface PhasesProps {
  phases: PhasesType[];
}

const Phases: React.FC<PhasesProps> = ({ phases }) => {
  const [phaseActive, setPhaseActive] = useState(0);

  useEffect(() => {
    const updatePhase = () => {
      const now = new Date();
      let active = 0;

      for (let i = 0; i < phases.length; i++) {
        const phaseDate = phases[i].dateTime;
        if (now >= phaseDate) {
          active = i + 1;
        }
      }

      setPhaseActive(active);
    };
    updatePhase();

    const interval = setInterval(updatePhase, 1000);

    return () => clearInterval(interval);
  }, [phases]);

  return (
    <div className="flex flex-col gap-6 mt-8">
      {phases.map((phase: PhasesType, index: number) => {
        return (
          <div key={index} className={`flex items-center gap-8 max-md:gap-2`}>
            <div className="relative h-full items-center flex">
              <FaRegCircleCheck
                className={`text-2xl ${phaseActive == index + 1 ? "text-primary animate-pulse" : "text-grays"}`}
              />
              {index != phases.length - 1 && (
                <div className="w-[1px] h-full absolute bg-border left-1/2 -translate-x-1/2 top-1/2 mt-3"></div>
              )}
            </div>
            <div className="border border-line p-4 rounded flex justify-between items-center flex-1 gap-2">
              <div>
                <p className={`${phaseActive == index + 1 && "text-primary"}`}>
                  {phase.title}
                </p>
                <p className="mt-2">{phase.timeString}</p>
              </div>
              <div>
                <div className="flex gap-2 items-center justify-end">
                  <p className="text-grays text-end">
                    Price: <span className="text-white">{phase.price}</span>
                  </p>
                </div>
                <p className="mt-2 text-grays text-end">
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
