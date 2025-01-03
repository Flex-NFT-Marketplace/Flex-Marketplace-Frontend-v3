"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetNFTActivity } from "../api/useGetNFTActivity";
import { ISignature } from "@/types/ISignature";
import { useParams } from "next/navigation";

interface ActivityContextType {
  signatures: ISignature[];

  fetchNextPage: () => void;
  isLoading: boolean;
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

  signatures10: ISignature[];
}

export const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

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
  ALL = "",
  LISTING = "LISTING",
  BID = "BID",
  SOLD = "SOLD",
}

export type SortStatusType =
  | SortStatusEnum.ALL
  | SortStatusEnum.LISTING
  | SortStatusEnum.BID
  | SortStatusEnum.SOLD;

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const [signatures, setSignatures] = useState<ISignature[]>([]);
  const [signatures10, setSignatures10] = useState<ISignature[]>([]);
  const { contract_address } = useParams();

  const [priceSortType, setPriceSortType] = useState<PriceSortType>(
    PriceSortEnum.CURRENT
  );

  const [sortStatus, setSortStatus] = useState<SortStatusType>(
    SortStatusEnum.ALL
  );

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchValue, setSearchValue] = useState<string>("");

  const {
    fetchNextPage,
    data: signatureRes,
    isLoading,
    isFetching,
    hasNextPage,
  } = useGetNFTActivity(
    contract_address as string,
    priceSortType,
    sortStatus,
    minPrice,
    maxPrice,
    searchValue
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["NFT_ACTIVITY"] });
  }, [
    priceSortType,
    sortStatus,
    minPrice,
    maxPrice,
    searchValue,
    contract_address,
  ]);

  useEffect(() => {
    let nftsArr: ISignature[] = [];

    signatureRes?.pages?.map((page) => {
      nftsArr = [...nftsArr, ...page?.data?.items];
    });

    setSignatures(nftsArr);
  }, [signatureRes]);

  useEffect(() => {
    setSignatures10(signatures.slice(0, 10));
  }, [signatures]);

  const value = {
    signatures,
    fetchNextPage,
    isLoading: isFetching,
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

    signatures10,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivityContext must be used within a CollectionProvider"
    );
  }
  return context;
};
