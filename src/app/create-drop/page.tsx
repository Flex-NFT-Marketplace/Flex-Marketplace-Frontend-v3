"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Steps from "./Steps";
import { IGroupMultiple } from "@/types/ICollection";
import { useCreateNewGroup } from "@/services/api/flexhaus/createDrop/useCreateNewGroup";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAddCollectibleToGroup } from "@/services/api/flexhaus/createDrop/useAddCollectibleToGroup";
import { useGetGroups } from "@/services/api/flexhaus/createDrop/useGetGroups";
import { useAccount } from "@starknet-react/core";

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
  base_uri: string;
  contractAddress: string;
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
  multipleDrops: IGroupMultiple[];
  multipleDropsSelected: IGroupMultiple | undefined;
  individualDrops: string;
}

const initialState: AllStateProps = {
  // Common
  activeStep: 2,
  base_uri: "https://api.hyperflex.market/metadata/67a0e3cc81a3a90f39d90249",
  contractAddress:
    "0x04f6304c4833c634a446783f210aebfb0728a8cfeb1b05177e713c5dd535d462",

  // Step 1
  tokenName: "DROP1",
  tokenSymbol: "DROP1",
  fileNftImage: null,
  imagePreview: "",
  nftDescription: "",
  metadata1: "DROP1",
  metadata2: "common",
  metadata3: "1",

  // Step 2
  isCheckRandomly: true,
  isCheckSupporters: false,
  amountSupporters: 0,
  dropType: DropTypeEnum.FREE,
  amountDrop: 0,
  sets: SetsTypeEnum.GROUP,
  multipleDrops: [],
  multipleDropsSelected: undefined,
  individualDrops: "",
};

const CreateDropContext = createContext<{
  allState: AllStateProps;
  setAllState: React.Dispatch<React.SetStateAction<AllStateProps>>;
  handleCreateNewGroup: (
    collectible: string,
    startDate: number,
    expiryDate: number
  ) => void;
  handleAddCollectibleToGroup: (setId: string, collectible: string) => void;
  reloadGroups: (address: string) => void;
}>({
  allState: initialState,
  setAllState: () => {},
  handleCreateNewGroup: (
    collectible: string,
    startDate: number,
    expiryDate: number
  ) => {},
  handleAddCollectibleToGroup: (setId: string, collectible: string) => {},
  reloadGroups: (address: string) => {},
});

const CreateDropProvider = ({ children }: { children: ReactNode }) => {
  const [allState, setAllState] = useState<AllStateProps>(initialState);
  const { address } = useAccount();
  // const [groupDrop, setGroupDrop] = useState<>(initialGroupDrop);
  const { onShowToast } = useToast();

  const _createNewGroup = useCreateNewGroup();
  const handleCreateNewGroup = async (
    collectible: string,
    startDate: number,
    expiryDate: number
  ) => {
    try {
      await _createNewGroup.mutateAsync({
        collectible: collectible,
        startDate: startDate,
        expiryDate: expiryDate,
      });
    } catch (error) {
      onShowToast("Failed to create group");
    }
  };

  const _addCollectibleToGroup = useAddCollectibleToGroup();
  const handleAddCollectibleToGroup = async (
    setId: string,
    collectible: string
  ) => {
    try {
      await _addCollectibleToGroup.mutateAsync({
        setId: setId,
        collectible: collectible,
      });
    } catch (error) {
      onShowToast("Failed to add collectible to group");
    }
  };

  const _getGroups = useGetGroups();
  const handleGetGroups = async (creator: string) => {
    try {
      const groups = await _getGroups.mutateAsync(creator);

      // set state
    } catch (error) {
      onShowToast("Failed to get groups");
    }
  };

  const reloadGroups = async (address: string) => {
    handleGetGroups(address);
  };

  useEffect(() => {
    if (address) {
      handleGetGroups(address);
    }
  }, [address]);

  const value = {
    allState,
    setAllState,
    handleCreateNewGroup,
    handleAddCollectibleToGroup,
    reloadGroups,
  };

  return (
    <CreateDropContext.Provider value={value}>
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
        {/* {allState.activeStep == 1 && (
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
        )} */}
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
