"use client";
import { createContext, useContext, useEffect, useState } from "react";
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

  const _getProfile = useGetProfile();
  const _getNfts = useGetNftsByOwner(address);
  const _getNft = useGetNftByOwner();
  const _getListing = useGetListingsByOwner();
  const _getBid = useGetBidsByOwner();

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
  }, [accountAddress, address]);

  useEffect(() => {
    setLoading(true);
    setNfts([]);
    // getNftOfOwner();
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

  const getNftOfOwner = async () => {
    try {
      if (accountAddress === "") return;
      const res = await _getNfts.mutateAsync(accountAddress as string);
      setNftsOwner(res);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    getNftOfOwner();
  }, [accountAddress]);

  const onReloadNftOwner = () => {
    setLoading(true);
    getNftOfOwner();
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
