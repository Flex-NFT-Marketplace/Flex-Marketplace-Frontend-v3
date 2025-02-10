"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { IAttributesCollection } from "@/types/INft";
import dayjs, { Dayjs } from "dayjs";

interface AllStateProps {
  activeStep: number;
  tokenName: string;
  tokenSymbol: string;
  fileNftImage: File | null;
  imagePreview: string | null;
  creatorEarnings: number;
  isFreeEarnings: boolean;
  receiverWallet: string | null;
  isSelfReceiverWallet: boolean;
  projectName: string;
  website: string | null;
  xAccount: string | null;
  discord: string | null;
  warpcastProfile: string | null;
  description: string;
  listStraits: NftTrait[];
  traitManager: TraitManager[];
  phases: Phase[];
}

export interface NftTrait {
  image: File;
  traits: IAttributesCollection[];
}

export interface Phase {
  phaseId: number;
  phaseName: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  maxMintPerWallet: string;
  isFreeEarnings: boolean;
  mintPrice: string;
  isFreeMint: boolean;
  receiverWallet: string;
  isSelf: boolean;
  whiteListArray: string[];
}

export interface TraitManager {
  type: string;
  subType: string[];
}

const initialState: AllStateProps = {
  // Common
  activeStep: 4,

  // Step 1
  tokenName: "",
  tokenSymbol: "",
  fileNftImage: null,
  imagePreview: null,
  creatorEarnings: 0,
  isFreeEarnings: false,
  receiverWallet: null,
  isSelfReceiverWallet: false,

  // Step 2
  projectName: "",
  website: "",
  xAccount: "",
  discord: "",
  warpcastProfile: "",
  description: "",

  // step 3
  listStraits: [],
  traitManager: [],

  // step 4
  phases: [
    {
      phaseId: 0,
      phaseName: "",
      startDate: dayjs(),
      endDate: dayjs(),
      maxMintPerWallet: "1",
      isFreeEarnings: false,
      mintPrice: "",
      isFreeMint: false,
      receiverWallet: "",
      isSelf: false,
      whiteListArray: [],
    },
  ],
};

const CreateCollectionContext = createContext<{
  allState: AllStateProps;
  setAllState: React.Dispatch<React.SetStateAction<AllStateProps>>;
}>({
  allState: initialState,
  setAllState: () => {},
});

const CreateDropProvider = ({ children }: { children: ReactNode }) => {
  const [allState, setAllState] = useState<AllStateProps>(initialState);

  return (
    <CreateCollectionContext.Provider value={{ allState, setAllState }}>
      {children}
    </CreateCollectionContext.Provider>
  );
};

export const useCreateCollection = () => useContext(CreateCollectionContext);

const CreateCollectionContent = () => {
  const { allState } = useCreateCollection();
  return (
    <div className="fixed-height-under-header relative flex flex-col">
      <div className="border-b border-line py-4">
        <p className="mx-auto max-w-[1200px] px-2 font-bold uppercase text-grays">
          Create NFT Collection
        </p>
      </div>

      <div className="flex-1">
        {allState.activeStep == 1 && <Step1 />}
        {allState.activeStep == 2 && <Step2 />}
        {allState.activeStep == 3 && <Step3 />}
        {allState.activeStep == 4 && <Step4 />}
        {/* <TraitManagement /> */}
        {/* <ViewNFT /> */}
      </div>
      {/* <label
        className="inline-flex h-9 w-[213px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-line bg-primary px-4 py-2 text-sm font-bold uppercase text-background ring-offset-background duration-700 hover:bg-primary/80 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        htmlFor="btnStep1"
      >
        <p className="text-center text-black">Deploy</p>
      </label> */}
      {/* <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-2 pb-10">
        <label
          className="inline-flex h-9 w-[213px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-line bg-primary px-4 py-2 text-sm font-bold uppercase text-background ring-offset-background duration-700 hover:bg-primary/80 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          htmlFor="btnStep1"
        >
          <p className="text-center text-black">Deploy</p>
        </label>
      </div> */}
    </div>
  );
};

const CreateCollection = () => {
  return (
    <CreateDropProvider>
      <CreateCollectionContent />
    </CreateDropProvider>
  );
};
export default CreateCollection;
