"use client";
import React from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Steps from "./Steps";
import CreateDropProvider, {
  useCreateDrop,
} from "@/services/providers/CreateDropProvider";
import { Suspense } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const CreateDropContent = () => {
  const { allState } = useCreateDrop();
  return (
    <div className="fixed-height-under-header relative">
      <div className="border-b border-line py-4">
        <div className="mx-auto max-w-[1200px] px-2 font-bold uppercase text-grays flex items-center gap-2">
          {allState.perksId && allState.activeStep == 1 ? (
            <Link href={"/drophaus"}>
              <IoIosArrowBack className="cursor-pointer hover:text-white transition-all" />
            </Link>
          ) : (
            <Link href={"/flex-create"}>
              <IoIosArrowBack className="cursor-pointer hover:text-white transition-all" />
            </Link>
          )}

          {allState.perksId ? "Create Reward" : "Create DROP"}
        </div>
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
    <Suspense>
      <CreateDropProvider>
        <CreateDropContent />
      </CreateDropProvider>
    </Suspense>
  );
};

export default CreateDrop;
