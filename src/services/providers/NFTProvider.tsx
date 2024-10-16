"use client";

import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { createContext, useContext, useEffect, useState } from "react";
import useGetNftByAddress from "../api/account/useGetNftsByOwner";
import { useGetNft } from "../api/nft/useGetNft";
import { useAccount } from "@starknet-react/core";
import { useGetIsOwnerNft } from "../api/nft/useGetIsOwnerNft";
import { Provider, Contract, Account, ec, json, RpcProvider } from "starknet";
import { usePathname, useRouter } from "next/navigation";
import { ISignature } from "@/types/ISignature";
import { useGetNftByOwner } from "../api/account/useGetNftByOwner";

export interface NftContextType {
  nft?: INft;
  collection?: ICollection;
  isOwner: boolean;
  getData: (contractAddress: string, tokenId: string, address: string) => void;
  clearData: () => void;
  loadingStatus: NftLoadingAction;
  bestAsk?: ISignature;
  listAsk?: ISignature[];
  listBid?: ISignature[];
  onReload: () => void;
}

export enum NftLoadActionEnum {
  LOADED_IS_OWNER = "LOADED_IS_OWNER",
  LOADING = "LOADING",
  LOADED = "LOADED",
}

export type NftLoadingAction =
  | NftLoadActionEnum.LOADED_IS_OWNER
  | NftLoadActionEnum.LOADING
  | NftLoadActionEnum.LOADED;

const NftContext = createContext<NftContextType | undefined>(undefined);

const NftProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingStatus, setLoadingStatus] = useState<NftLoadingAction>(
    NftLoadActionEnum.LOADING,
  );

  const { address } = useAccount();
  const [nft, setNft] = useState<INft | undefined>(undefined);
  const [listAsk, setListAsk] = useState<ISignature[]>([]);
  const [collection, setCollection] = useState<ICollection>();
  const [bestAsk, setBestAsk] = useState<ISignature | undefined>(undefined);
  const [listBid, setListBid] = useState<ISignature[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoadingStatus(NftLoadActionEnum.LOADING);
    clearData();
  }, [pathname]);

  const _getNft = useGetNftByOwner();
  const _getIsOwner = useGetIsOwnerNft();

  const getOwner = async (_nft: INft, address: string) => {
    if (!_nft || !address) return;
    setIsOwner(false);

    try {
      await getIsOwner(_nft.contract_address, _nft.token_id, address);
    } catch (error) {
    }

    setLoadingStatus(NftLoadActionEnum.LOADED_IS_OWNER);
  };

  const getIsOwner = async (
    contractAddress: string,
    tokenId: string,
    _address: string,
  ) => {
    try {
      const res = await _getIsOwner.mutateAsync({
        contract_address: contractAddress,
        token_id: tokenId,
        address: _address,
      });

      setIsOwner(res);
    } catch (error) {
      setIsOwner(false);
      console.error(error);
    }
  };

  const getData = async (
    contractAddress: string,
    tokenId: string,
    _address: string,
  ) => {
    try {
      setLoadingStatus(NftLoadActionEnum.LOADING);

      const res = await _getNft.mutateAsync({
        contract_address: contractAddress,
        token_id: tokenId,
        owner_address: address || "",
      });

      setNft(res.nft);
      setCollection(res.collection);
      setBestAsk(res.orderData.bestAsk);
      setListAsk(res.orderData.listAsk);
      setListBid(res.orderData.listBid);

      getOwner(res.nft, _address);
    } catch (error) {
      console.error(error);
    }
  };

  const clearData = () => {
    setNft(undefined);
    setCollection(undefined);
  };

  const onReload = () => {
    if (nft) {
      getData(nft.contract_address, nft.token_id, address as string);
    }
  };

  const value = {
    nft,
    collection,
    getData,
    clearData,
    isOwner,
    loadingStatus,
    bestAsk,
    listAsk,
    listBid,
    onReload,
  };

  return <NftContext.Provider value={value}>{children}</NftContext.Provider>;
};

export const useNftContext = () => {
  const context = useContext(NftContext);
  if (context === undefined) {
    throw new Error("useNftContext must be used within a NftProvider");
  }
  return context;
};

export default NftProvider;
