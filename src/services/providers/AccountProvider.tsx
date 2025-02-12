"use client";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useGetProfile } from "../api/useGetProfile";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import useGetNftsByOwner from "../api/account/useGetNftsByOwner";
import { useGetNftByOwner } from "../api/account/useGetNftByOwner";
import { useAccount } from "@starknet-react/core";
import {
  IProfileStaging,
  IStagingNft,
  IStagingNftResponse,
} from "@/types/IStagingNft";
import useGetListingsByOwner from "../api/account/useGetListingsByOwner";
import useGetBidsByOwner from "../api/account/useGetBidsByOwners";
import { useGetTotalSub } from "../api/flexhaus/social/useGetTotalSub";
import { useSubcribe } from "../api/flexhaus/social/useSubcribe";
import { useUnSubcribe } from "../api/flexhaus/social/useUnSubcribe";
import { useCheckSubcribed } from "../api/flexhaus/social/useCheckSubcribed";
import { formattedContractAddress } from "@/utils/string";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { ICollectibleState, IdropDetail } from "@/types/Idrop";
import useGetDistributed from "../api/flexhaus/dropDetail/useGetDistributed";

interface AccountContextType {
  nfts: IStagingNftResponse[];
  profile?: IProfileStaging;
  setAddress: (address: string) => void;
  onReload: (nft: IStagingNft) => void;
  onReloadNftOwner: () => void;
  orders: ISignature[];
  bids: ISignature[];
  loading: boolean;
  profileOwner?: IProfileStaging;
  nftsOwner: IStagingNftResponse[];
  getProfileByAddressOwner: () => void;
  fetchNextPageInventory: () => void;
  toggleSubcribe: (creator: string) => Promise<boolean>;
  handleCheckSubcribed: (creator: string) => Promise<boolean>;
  handleGetTotalSub: (creator: string) => Promise<number>;
  dropsDistributed: ICollectibleState[];
}

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address: accountAddress } = useAccount();
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<IProfileStaging>();
  const [profileOwner, setProfileOwner] = useState<IProfileStaging>();
  const [nfts, setNfts] = useState<IStagingNftResponse[]>([]);
  const [nftsOwner, setNftsOwner] = useState<IStagingNftResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState<ISignature[]>([]);
  const [bids, setBids] = useState<ISignature[]>([]);
  const [dropsDistributed, setDropsDistributed] = useState<ICollectibleState[]>(
    []
  );

  const { onShowToast } = useToast();

  const _getProfile = useGetProfile();
  // const _getNfts = useGetNftsByOwner(address);
  const _getNft = useGetNftByOwner();
  const _getListing = useGetListingsByOwner();
  const _getBid = useGetBidsByOwner();
  const {
    data: userDropsDistributed,
    isLoading: isLoadingDistributed,
    fetchNextPage: fetchNextPageDistributed,
  } = useGetDistributed();

  useEffect(() => {
    let distributedDrops: ICollectibleState[] = [];
    userDropsDistributed?.pages.map((page) => {
      distributedDrops = [...distributedDrops, ...page.data.items];
    });

    setDropsDistributed(distributedDrops);
  }, [userDropsDistributed]);

  const {
    data: nftsOwnerRepsonse,
    isLoading,
    fetchNextPage: fetchNextPageInventory,
  } = useGetNftsByOwner(accountAddress as string);

  const getListingByOwner = async () => {
    if (!address) return;
    const listing = await _getListing.mutateAsync({
      ownerAddress: address,
      status: SignStatusEnum.LISTING,
    });
    setOrders(listing);
  };

  const getProfileByAddress = async (address: string) => {
    try {
      if (!address) return;
      const res = await _getProfile.mutateAsync(address);
      if (res) setProfile(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileByAddressOwner = async () => {
    try {
      if (accountAddress === "" || !accountAddress) return;
      const res = await _getProfile.mutateAsync(accountAddress as string);
      if (res) setProfileOwner(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getBid = async () => {
    if (!address) return;
    try {
      let res = await _getBid.mutateAsync({
        ownerAddress: address,
        status: SignStatusEnum.BID,
      });
      setBids(res);
    } catch (error) {}
  };

  const _subScribe = useSubcribe();
  const handleSubcribe = async (creator: string): Promise<boolean> => {
    return await _subScribe.mutateAsync(creator);
  };

  const _unSubcribe = useUnSubcribe();
  const handleUnSubcribe = async (creator: string): Promise<boolean> => {
    return await _unSubcribe.mutateAsync(creator);
  };

  const _checkSubcribed = useCheckSubcribed();
  const handleCheckSubcribed = async (creator: string): Promise<boolean> => {
    if (!creator) return false;
    if (
      formattedContractAddress(creator) == formattedContractAddress(address)
    ) {
      return false;
    }
    return await _checkSubcribed.mutateAsync(creator);
  };

  const toggleSubcribe = async (creator: string): Promise<boolean> => {
    if (!accountAddress) {
      onShowToast("Please connect your wallet");
      return false;
    }
    let canUnSubcribe = false; // if user is following -> true, if user is not following -> false
    if (await handleCheckSubcribed(creator)) {
      const res = await handleUnSubcribe(creator);
      canUnSubcribe = res;
    } else {
      const res = await handleSubcribe(creator);
      canUnSubcribe = res;
    }

    return canUnSubcribe;
  };

  useEffect(() => {
    setLoading(true);

    setOrders([]);
    setBids([]);
    if (accountAddress == address) {
      getListingByOwner();
      getBid();
    }
    setLoading(false);

    if (accountAddress == undefined) return;
    getProfileByAddressOwner();
  }, [accountAddress]);

  useEffect(() => {
    setLoading(true);
    setNfts([]);
    getListingByOwner();
    getProfileByAddress(address);
  }, [address]);

  const updateNftInArray = (updatedNftData: IStagingNft) => {
    // Step 2: Find the index of the NFT to update
    const index = nfts.findIndex(
      (nft) =>
        nft.nftData.nftContract === updatedNftData.nftContract &&
        nft.nftData.tokenId === updatedNftData.tokenId
    );

    // Check if the NFT was found
    if (index !== -1) {
      // Step 3: Create a new array with the updated NFT
      const updatedNfts = [...nfts];
      updatedNfts[index] = { ...updatedNfts[index], ...updatedNftData };

      // Step 4: Update the state with the new array
      setNfts(updatedNfts);
    }
  };

  const onReloadNft = async (nft: IStagingNft) => {
    try {
      let res = await _getNft.mutateAsync({
        contract_address: nft.nftContract,
        token_id: nft.tokenId,
        owner_address: address,
      });

      getListingByOwner();
      getBid();
      updateNftInArray(res.nft);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onReload = (nft: IStagingNft) => {
    if (nft) {
      setLoading(true);
      onReloadNft(nft);
    }
  };

  const getNftsOfOwner = () => {
    if (nftsOwnerRepsonse) {
      setLoading(true);
      const nfts: IStagingNftResponse[] = [];
      nftsOwnerRepsonse.pages.map((page) => {
        nfts.push(...page?.data?.items);
      });
      setNftsOwner(nfts);
      setLoading(false);
    }
  };

  const _getTotalSub = useGetTotalSub();
  const handleGetTotalSub = async (creator: string): Promise<number> => {
    if (!creator) return 0;
    return await _getTotalSub.mutateAsync(creator);
  };

  useEffect(() => {
    getNftsOfOwner();
  }, [nftsOwnerRepsonse]);

  // useEffect(() => {
  //   setLoading(true);
  //   getNftOfOwner();
  // }, [accountAddress]);

  const onReloadNftOwner = () => {
    setLoading(true);
    getNftsOfOwner();
  };

  const value: AccountContextType = {
    nfts: nfts,
    profile: profile,
    orders: orders,
    setAddress: setAddress,
    onReload,
    onReloadNftOwner,
    getProfileByAddressOwner,
    bids,
    loading,
    profileOwner,
    nftsOwner,
    fetchNextPageInventory,
    toggleSubcribe,
    handleCheckSubcribed,
    handleGetTotalSub,
    dropsDistributed,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
