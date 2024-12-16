"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Steps from "./Steps";

export enum DropTypeEnum {
  FREE = "Free",
  PROTECTED = "Protected",
}

export enum SetsTypeEnum {
  GROUP = "Group",
  INDIVIDUAL = "Individual",
}
type DropType = DropTypeEnum.FREE | DropTypeEnum.PROTECTED;

type SetsType = SetsTypeEnum.GROUP | SetsTypeEnum.INDIVIDUAL;

interface AllStateProps {
  activeStep: number;
  tokenName: string;
  tokenSymbol: string;
  fileNftImage: File | null;
  imagePreview: string | null;
  nftDescription: string;
  metadata1: string;
  metadata2: string;
  metadata3: string;
  isCheckRandomly: boolean;
  isCheckSupporters: boolean;
  amountSupporters: number;
  dropType: DropType;
  amountDrop: number;
  sets: SetsType;
  multipleDrops: string;
  individualDrops: string;
}

const initialState: AllStateProps = {
  // Common
  activeStep: 1,

  // Step 1
  tokenName: "",
  tokenSymbol: "",
  fileNftImage: null,
  imagePreview: "",
  nftDescription: "",
  metadata1: "",
  metadata2: "",
  metadata3: "",

  // Step 2
  isCheckRandomly: true,
  isCheckSupporters: false,
  amountSupporters: 0,
  dropType: DropTypeEnum.FREE,
  amountDrop: 0,
  sets: SetsTypeEnum.GROUP,
  multipleDrops: "",
  individualDrops: "",
};

const CreateDropContext = createContext<{
  allState: AllStateProps;
  setAllState: React.Dispatch<React.SetStateAction<AllStateProps>>;
}>({
  allState: initialState,
  setAllState: () => {},
});

const CreateDropProvider = ({ children }: { children: ReactNode }) => {
  const [allState, setAllState] = useState<AllStateProps>(initialState);

  return (
    <CreateDropContext.Provider value={{ allState, setAllState }}>
      {children}
    </CreateDropContext.Provider>
  );
};

export const useCreateDrop = () => useContext(CreateDropContext);

const CreateDropContent = () => {
  const { allState } = useCreateDrop();
  return (
    <div className="fixed-height-under-header relative">
      <div className="border-b border-line py-4">
        <p className="mx-auto max-w-[1200px] px-2 font-bold uppercase text-grays">
          Create DROP
        </p>
      </div>

      <div className="mt-10 pb-9">
        {allState.activeStep == 1 && <Step1 />}
        {allState.activeStep == 2 && <Step2 />}
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-2 pb-10">
        <Steps />
        {allState.activeStep == 1 && (
          <label
            className="inline-flex h-9 w-[213px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-line bg-primary px-4 py-2 text-sm font-bold uppercase text-background ring-offset-background duration-700 hover:bg-primary/80 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            htmlFor="btnStep1"
          >
            <p className="text-center text-black">Deploy</p>
          </label>
        )}

        {allState.activeStep == 2 && (
          <label
            className="inline-flex h-9 w-[213px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-line bg-primary px-4 py-2 text-sm font-bold uppercase text-background ring-offset-background duration-700 hover:bg-primary/80 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
            htmlFor="btnStep2"
          >
            <p className="text-center text-black">Create</p>
          </label>
        )}
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
