import { createContext, ReactNode, useContext, useState } from "react";
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
  activeStep: 1,

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

interface CreateCollectionContextType {
  allState: AllStateProps;
  setAllState: React.Dispatch<React.SetStateAction<AllStateProps>>;
}

const CreateCollectionContext = createContext<
  CreateCollectionContextType | undefined
>(undefined);

export const CreateCollectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allState, setAllState] = useState<AllStateProps>(initialState);

  return (
    <CreateCollectionContext.Provider value={{ allState, setAllState }}>
      {children}
    </CreateCollectionContext.Provider>
  );
};

export const useCreateCollection = () => {
  const context = useContext(CreateCollectionContext);
  if (!context) {
    throw new Error(
      "useCreateCollection must be used within a CreateCollectionProvider"
    );
  }
  return context;
};
