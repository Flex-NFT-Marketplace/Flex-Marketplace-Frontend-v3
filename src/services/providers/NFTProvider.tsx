"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useParams, usePathname } from "next/navigation";
import { ISignature } from "@/types/ISignature";
import { useGetNftByOwner } from "../api/account/useGetNftByOwner";
import { IStagingNft } from "@/types/IStagingNft";
import { useGetNft } from "../api/nft/useGetNft";
import { useGetCollectionDetail } from "../api/collection/useGetCollectionDetail";
import { IStagingCollection } from "@/types/IStagingCollection";
import { formattedContractAddress } from "@/utils/string";

export interface NftContextType {
  nftStaging?: IStagingNft;
  collection?: IStagingCollection;
  isOwner: boolean;
  getNft: () => void;
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
    NftLoadActionEnum.LOADING
  );

  const { address } = useAccount();
  const [listAsk, setListAsk] = useState<ISignature[]>([]);
  const [collection, setCollection] = useState<IStagingCollection>();
  const [bestAsk, setBestAsk] = useState<ISignature | undefined>(undefined);
  const [listBid, setListBid] = useState<ISignature[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const pathname = usePathname();
  const { contract_address, token_id } = useParams();
  const [nftStaging, setNftStaging] = useState<IStagingNft>();

  useEffect(() => {
    setLoadingStatus(NftLoadActionEnum.LOADING);
    clearData();
  }, [pathname]);

  const getNft = async () => {
    if (contract_address && token_id) {
      setLoadingStatus(NftLoadActionEnum.LOADING);
      const nftRes = await _nftInfo.mutateAsync({
        contract_address: contract_address.toString(),
        token_id: token_id.toString(),
      });
      setNftStaging(nftRes.nftData);
      setBestAsk(nftRes.orderData.bestAsk);
      setListAsk(nftRes.orderData.listAsk);
      setListBid(nftRes.orderData.listBid);
    }
  };
  const getCollection = async () => {
    if (!contract_address) return;
    const res = await _getCollection.mutateAsync(contract_address as string);

    setCollection(res);
  };

  useEffect(() => {
    getNft();
    getCollection();
  }, [contract_address, token_id]);

  const _nftInfo = useGetNft();
  const _getCollection = useGetCollectionDetail();
  const _getNft = useGetNftByOwner();
  // const _getIsOwner = useGetIsOwnerNft();

  // const getOwner = async (_nft: IStagingNft, address: string) => {
  //   if (!_nft || !address) return;
  //   setIsOwner(false);

  //   try {
  //     await getIsOwner(_nft.nftContract, _nft.tokenId, address);
  //   } catch (error) {}

  //   setLoadingStatus(NftLoadActionEnum.LOADED_IS_OWNER);
  // };

  // const getIsOwner = async (
  //   contractAddress: string,
  //   tokenId: string,
  //   _address: string
  // ) => {
  //   try {
  //     const res = await _getIsOwner.mutateAsync({
  //       contract_address: contractAddress,
  //       token_id: tokenId,
  //       address: _address,
  //     });

  //     setIsOwner(res);
  //   } catch (error) {
  //     setIsOwner(false);
  //     console.error(error);
  //   }
  // };

  // const getData = async (
  //   contractAddress: string,
  //   tokenId: string,
  //   _address: string
  // ) => {
  //   try {
  //     setLoadingStatus(NftLoadActionEnum.LOADING);

  //     const res = await _getNft.mutateAsync({
  //       contract_address: contractAddress,
  //       token_id: tokenId,
  //       owner_address: address || "",
  //     });

  //     setNft(res.nft);

  //     // setCollection(res.collection);
  //     setBestAsk(res.orderData.bestAsk);
  //     setListAsk(res.orderData.listAsk);
  //     setListBid(res.orderData.listBid);

  //     // getOwner(res.nft, _address);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const clearData = () => {
    setNftStaging(undefined);
    setCollection(undefined);
  };

  const onReload = () => {
    if (nftStaging) {
      getNft();
    }
  };

  useEffect(() => {
    if (address && nftStaging) {
      //
      setIsOwner(
        formattedContractAddress(address.toLowerCase()) ==
          formattedContractAddress(nftStaging?.owner?.address?.toLowerCase())
      );
      setLoadingStatus(NftLoadActionEnum.LOADED_IS_OWNER);
    }
  }, [address, nftStaging]);

  const value = {
    nftStaging,
    collection,
    getNft,
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
