"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ICollection } from "@/types/ICollection";
import { useGetCollectionDetail } from "../api/collection/useGetCollectionDetail";
import { useParams } from "next/navigation";
import { useGetNFTCollection } from "../api/collection/useGetNFTCollection";
import { INft, INftCollection } from "@/types/INft";
import { useQueryClient } from "@tanstack/react-query";
import {
  ICollectionCounter,
  ICollectionEconomic,
  IStagingCollection,
} from "@/types/IStagingCollection";
import { useGetCollectionEconomic } from "../api/collection/useGetCollectionEconomic";
import { useGetCollectionCount } from "../api/collection/useGetNftCount";
import { IStagingNft } from "@/types/IStagingNft";

interface CollectionDetailContextType {
  collectionCount?: ICollectionCounter;
  collectionEconomic?: ICollectionEconomic;
  collection?: IStagingCollection;
  nfts: IStagingNft[];
  getCollectionData: (contract_address: string) => void;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;

  priceSortType: PriceSortType;
  setPriceSortType: (type: PriceSortType) => void;

  sortStatus: SortStatusType;
  setSortStatus: (status: SortStatusType) => void;

  minPrice: number;
  setMinPrice: (price: number) => void;

  maxPrice: number;
  setMaxPrice: (price: number) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const CollectionDetailContext = createContext<
  CollectionDetailContextType | undefined
>(undefined);

export enum PriceSortEnum {
  ASC = "asc",
  DESC = "desc",
  CURRENT = "current",
}

export type PriceSortType =
  | PriceSortEnum.ASC
  | PriceSortEnum.DESC
  | PriceSortEnum.CURRENT;

export enum SortStatusEnum {
  ALL = "ALL",
  LISTED = "LISTED",
}

export type SortStatusType = SortStatusEnum.ALL | SortStatusEnum.LISTED;

export const CollectionDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  const { contract_address } = useParams();
  const [collection, setCollection] = useState<IStagingCollection>();
  const [collectionEconomic, setCollectionEconomic] =
    useState<ICollectionEconomic>();

  const [collectionCount, setCollectionCount] = useState<ICollectionCounter>();
  const [nfts, setNfts] = useState<IStagingNft[]>([]);

  const [priceSortType, setPriceSortType] = useState<PriceSortType>(
    PriceSortEnum.ASC
  );

  const [sortStatus, setSortStatus] = useState<SortStatusType>(
    SortStatusEnum.ALL
  );

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (contract_address) {
      getCollectionData(contract_address as string);
      getCollectionEconomic(contract_address as string);
      getCollectionCount(contract_address as string);
    }
  }, [contract_address]);

  const _getCollectionDetail = useGetCollectionDetail();
  const _getCollectionEconomic = useGetCollectionEconomic();
  const _getCollectionCount = useGetCollectionCount();

  const {
    data: nftsRes,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useGetNFTCollection(
    contract_address as string,
    priceSortType,
    sortStatus,
    minPrice,
    maxPrice,
    searchValue
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["NFT_COLLECTION"] });
  }, [priceSortType, sortStatus, minPrice, maxPrice, searchValue]);

  useEffect(() => {
    let nftsArr: IStagingNft[] = [];

    nftsRes?.pages.map((page) => {
      nftsArr = [...nftsArr, ...page.items.nft];
    });

    setNfts(nftsArr);
  }, [nftsRes]);

  const getCollectionData = async (contract_address: string) => {
    const res = await _getCollectionDetail.mutateAsync(contract_address);
    setCollection(res);
  };

  const getCollectionEconomic = async (contract_address: string) => {
    const res = await _getCollectionEconomic.mutateAsync(contract_address);
    setCollectionEconomic(res);
  };

  const getCollectionCount = async (contract_address: string) => {
    const res = await _getCollectionCount.mutateAsync(contract_address);
    setCollectionCount(res);
  };

  const value = {
    collectionCount,
    collectionEconomic,
    collection,
    nfts,
    isLoading,
    isFetching,
    getCollectionData,
    fetchNextPage,
    hasNextPage,

    priceSortType,
    setPriceSortType,

    sortStatus,
    setSortStatus,

    minPrice,
    setMinPrice,

    maxPrice,
    setMaxPrice,

    searchValue,
    setSearchValue,
  };

  return (
    <CollectionDetailContext.Provider value={value}>
      {children}
    </CollectionDetailContext.Provider>
  );
};

export const useCollectionDetailContext = () => {
  const context = useContext(CollectionDetailContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
