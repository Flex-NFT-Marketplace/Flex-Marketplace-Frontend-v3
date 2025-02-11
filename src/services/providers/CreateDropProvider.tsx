import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { IDropGroup, ISet } from "@/types/Idrop";
import { useAccount } from "@starknet-react/core";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCreateNewGroup } from "../api/flexhaus/createDrop/useCreateNewGroup";
import { useAddCollectibleToGroup } from "../api/flexhaus/createDrop/useAddCollectibleToGroup";
import { useGetGroups } from "../api/flexhaus/createDrop/useGetGroups";
import { useRemoveCollectibleFromGroup } from "../api/flexhaus/createDrop/useRemoveCollectibleFromGroup";
import { useSearchParams } from "next/navigation";
import { Dayjs } from "dayjs";

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
  perksId: string | null;
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
  fromTopSupporters: number;
  toTopSupporters: number;
  dropType: DropType;
  protectedAmount: number;
  sets: SetsType;
  groupSelected: IDropGroup | undefined;
  individualDropsStartDate: Dayjs | null;
  individualDropsExpiryDate: Dayjs | null;
}

const initialState: AllStateProps = {
  // Common
  perksId: null,
  activeStep: 1,
  base_uri: "",
  contractAddress: "",

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
  fromTopSupporters: 0,
  toTopSupporters: 0,
  dropType: DropTypeEnum.FREE,
  protectedAmount: 0,
  sets: SetsTypeEnum.GROUP,
  groupSelected: undefined,
  individualDropsStartDate: null,
  individualDropsExpiryDate: null,
};

const CreateDropContext = createContext<
  | {
      allState: AllStateProps;
      setAllState: React.Dispatch<React.SetStateAction<AllStateProps>>;
      handleCreateNewGroup: (
        collectible: string,
        startDate: number,
        expiryDate: number
      ) => Promise<ISet>;
      handleAddCollectibleToGroup: (
        setId: string,
        collectible: string
      ) => Promise<ISet>;
      handleRemoveCollectibleFromGroup: (
        setId: string,
        collectible: string
      ) => Promise<void>;
      reloadGroups: (address: string) => void;
      groupDrop: IDropGroup[];
    }
  | undefined
>(undefined);

export const useCreateDrop = () => {
  const context = useContext(CreateDropContext);
  if (!context) {
    throw new Error(
      "useCreateDropContext must be used within a CreateDropProvider"
    );
  }
  return context;
};

const CreateDropProvider = ({ children }: { children: ReactNode }) => {
  const [allState, setAllState] = useState<AllStateProps>(initialState);
  const { address } = useAccount();
  const [groupDrop, setGroupDrop] = useState<IDropGroup[]>([]);
  const searchParams = useSearchParams();
  const perks = searchParams.get("perks");

  const _createNewGroup = useCreateNewGroup();
  const handleCreateNewGroup = async (
    collectible: string,
    startDate: number,
    expiryDate: number
  ): Promise<ISet> => {
    try {
      const set = await _createNewGroup.mutateAsync({
        collectible: collectible,
        startDate: startDate,
        expiryDate: expiryDate,
      });
      console.log(set);

      if (address) {
        await reloadGroups(address);
      }
      return set;
    } catch (error) {
      throw error;
    }
  };

  const _addCollectibleToGroup = useAddCollectibleToGroup();
  const handleAddCollectibleToGroup = async (
    setId: string,
    collectible: string
  ): Promise<ISet> => {
    try {
      const set = await _addCollectibleToGroup.mutateAsync({
        setId: setId,
        collectible: collectible,
      });
      return set;
    } catch (error) {
      throw error;
    }
  };

  const _getGroups = useGetGroups();
  const handleGetGroups = async (creator: string) => {
    const groups = await _getGroups.mutateAsync(creator);
    setGroupDrop(groups.items);
  };

  const _removeCollectibleFromGroup = useRemoveCollectibleFromGroup();
  const handleRemoveCollectibleFromGroup = async (
    setId: string,
    collectible: string
  ): Promise<void> => {
    await _removeCollectibleFromGroup.mutateAsync({
      setId: setId,
      collectible: collectible,
    });
  };

  const reloadGroups = async (address: string) => {
    handleGetGroups(address);
  };

  useEffect(() => {
    if (address) {
      handleGetGroups(address);
    }
  }, [address]);

  useEffect(() => {
    if (perks) {
      setAllState((prevState) => ({
        ...prevState,
        perksId: perks,
      }));
    }
  }, [perks]);

  const value = {
    allState,
    setAllState,
    handleCreateNewGroup,
    handleAddCollectibleToGroup,
    handleRemoveCollectibleFromGroup,
    reloadGroups,
    groupDrop,
  };

  return (
    <CreateDropContext.Provider value={value}>
      {children}
    </CreateDropContext.Provider>
  );
};

export default CreateDropProvider;
