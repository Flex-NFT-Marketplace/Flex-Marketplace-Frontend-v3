"use client";
import React from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Steps from "./Steps";
import CreateDropProvider, {
  useCreateDrop,
} from "@/services/providers/CreateDropProvider";
import { useSearchParams } from "next/navigation";

const CreateDropContent = () => {
  const { allState } = useCreateDrop();
  const searchParams = useSearchParams();
  const perks = searchParams.get("perks");
  return (
    <div className="fixed-height-under-header relative">
      <div className="border-b border-line py-4">
        <p className="mx-auto max-w-[1200px] px-2 font-bold uppercase text-grays">
          {perks ? "Create Reward" : "Create DROP"}
        </p>
      </div>

      <div className="mt-10 pb-9">
        {allState.activeStep == 1 && <Step1 />}
        {allState.activeStep == 2 && <Step2 />}
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-2 pb-10">
        <Steps />
      </div>
    </div>
  );
};

const CreateDrop = () => {
  return (
    <CreateDropProvider>
      <CreateDropContent />
    </CreateDropProvider>
  );
};

export default CreateDrop;
