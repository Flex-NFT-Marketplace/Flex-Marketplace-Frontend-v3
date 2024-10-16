"use client";
import { createContext, use, useContext, useEffect, useState } from "react";
import { INft } from "@/types/INft";
import { IProfile } from "@/types/IProfile";
import { useGetProfile } from "../api/useGetProfile";
import useGetNftByAddress, {
  INftAccountResponse,
} from "../api/account/useGetNftsByOwner";
import { useGetNft } from "../api/nft/useGetNft";
import { ISignature } from "@/types/ISignature";
import { usePathname } from "next/navigation";
import useGetNftsByOwner from "../api/account/useGetNftsByOwner";
import { useGetNftByOwner } from "../api/account/useGetNftByOwner";
import { useAccount } from "@starknet-react/core";
import useGetBidByAddress from "../api/useGetBidByAddress";
import useGetSignatureByAddress from "../api/useGetSignatureByAddress copy";
import { usePutProfile } from "../api/auth/usePutProfile";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

interface AccountContextType {
  nfts: INftAccountResponse[];
  profile?: IProfile;
  setAddress: (address: string) => void;
  onReload: (nft: INft) => void;
  onReloadNftOwner: () => void;
  orders: ISignature[];
  bids: ISignature[];
  loading: boolean;
  profileOwner?: IProfile;
  nftsOwner: INftAccountResponse[];
  onUpdateProfile: (profile: any) => Promise<void>;
  getProfileByAddressOwner: () => void;
}

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined,
);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { onShowToast } = useToast();
  const pathName = usePathname();
  const { address: accountAddress } = useAccount();
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<IProfile>();
  const [profileOwner, setProfileOwner] = useState<IProfile>();
  const [nfts, setNfts] = useState<INftAccountResponse[]>([]);
  const [nftsOwner, setNftsOwner] = useState<INftAccountResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState<ISignature[]>([]);
  const [bids, setBids] = useState<ISignature[]>([]);

  const _getProfile = useGetProfile();
  const _getNfts = useGetNftsByOwner(address);
  const _getNft = useGetNftByOwner();
  const _getSignature = useGetSignatureByAddress();
  const _getBid = useGetBidByAddress();

  const getProfileByAddress = async (address: string) => {
    try {
      if (address === "") return;
      const res = await _getProfile.mutateAsync(address);
      setProfile(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileByAddressOwner = async () => {
    try {
      if (accountAddress === "" || !accountAddress) return;
      const res = await _getProfile.mutateAsync(accountAddress as string);
      setProfileOwner(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getNfts = async (address: string) => {
    try {
      if (address === "" || !address) return;
      const res = await _getNfts.mutateAsync(address);
      setNfts(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getOrder = async () => {
    try {
      let res = await _getSignature.mutateAsync(accountAddress as string);
      setOrders(res);
    } catch (error) {}
  };

  const getBid = async () => {
    try {
      let res = await _getBid.mutateAsync(accountAddress as string);
      setBids(res);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);

    setOrders([]);
    setBids([]);
    if (accountAddress == address) {
      getOrder();
      getBid();
    }
    setLoading(false);

    if (accountAddress == undefined) return;
    getProfileByAddressOwner();
  }, [accountAddress, address]);

  useEffect(() => {
    setLoading(true);
    setNfts([]);
    getNfts(address);
    getProfileByAddress(address);
  }, [address]);

  const updateNftInArray = (updatedNftData: INftAccountResponse) => {
    // Step 2: Find the index of the NFT to update
    const index = nfts.findIndex(
      (nft) =>
        nft.nft.contract_address === updatedNftData.nft.contract_address &&
        nft.nft.token_id === updatedNftData.nft.token_id,
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

  const onReloadNft = async (nft: INft) => {
    try {
      let res = await _getNft.mutateAsync({
        contract_address: nft.contract_address,
        token_id: nft.token_id,
        owner_address: address,
      });

      getOrder();
      getBid();
      updateNftInArray(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onReload = (nft: INft) => {
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

  const _putUpdateProfile = usePutProfile();
  const onUpdateProfile = async (profile: any) => {
    try {
      await _putUpdateProfile
        .mutateAsync({ profile: profile, address: accountAddress as string })
        .then((res) => {
          onShowToast("Update profile success");
        });
    } catch (error) {}

    return;
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
    onUpdateProfile,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider",
    );
  }
  return context;
};
