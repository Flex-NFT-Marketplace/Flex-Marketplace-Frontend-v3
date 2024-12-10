"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGetCollectionDetail } from "../api/collection/useGetCollectionDetail";
import { useParams } from "next/navigation";
import { useGetNFTCollection } from "../api/collection/useGetNFTCollection";
import {
  IAttributesCollection,
  IAttributesCollectionFilter,
} from "@/types/INft";
import { useQueryClient } from "@tanstack/react-query";
import {
  ICollectionCounter,
  ICollectionEconomic,
  IStagingCollection,
} from "@/types/IStagingCollection";
import { useGetCollectionEconomic } from "../api/collection/useGetCollectionEconomic";
import { useGetCollectionCount } from "../api/collection/useGetNftCount";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useGetAttributesCollection } from "../api/collection/useGetAttributesCollection";

interface CollectionDetailContextType {
  collectionCount?: ICollectionCounter;
  collectionEconomic?: ICollectionEconomic;
  collection?: IStagingCollection;
  collectionAttributes: IAttributesCollectionFilter[];
  nfts: IStagingNftResponse[];
  getCollectionData: (contract_address: string) => void;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;

  traitType: string;
  setTraitType: (traitsType: string) => void;

  traitValue: string;
  setTraitValue: (traitValue: string) => void;

  traitsActive: IAttributesCollection[];
  setTraitsActive: (newTraitsActive: IAttributesCollection[]) => void;

  changeTraitsActive: (newTraitActive: IAttributesCollection) => void;

  setAttributesFilter: (attributes: IAttributesCollection[]) => void;

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
  // ALL = "ALL",
  LISTING = "LISTING",
  // BUYING = "BUYING",
}

export type SortStatusType = SortStatusEnum.LISTING | SortStatusEnum.LISTING;

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
  const [collectionAttributes, setCollectionAtributes] = useState<
    IAttributesCollectionFilter[]
  >([]);
  const [nfts, setNfts] = useState<IStagingNftResponse[]>([]);

  const [priceSortType, setPriceSortType] = useState<PriceSortType>(
    PriceSortEnum.ASC
  );

  const [sortStatus, setSortStatus] = useState<SortStatusType>(
    SortStatusEnum.LISTING
  );

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchValue, setSearchValue] = useState<string>("");
  const [attributesFilter, setAttributesFilter] = useState<
    IAttributesCollection[]
  >([]);
  const [traitsActive, setTraitsActive] = useState<IAttributesCollection[]>([]);
  const [traitType, setTraitType] = useState("");
  const [traitValue, setTraitValue] = useState("");

  useEffect(() => {
    if (contract_address) {
      getCollectionData(contract_address as string);
      getCollectionEconomic(contract_address as string);
      getCollectionCount(contract_address as string);
      getAttributesCollection(contract_address as string);
    }
  }, [contract_address]);

  const _getCollectionDetail = useGetCollectionDetail();
  const _getCollectionEconomic = useGetCollectionEconomic();
  const _getCollectionCount = useGetCollectionCount();
  const _getCollectionAttributes = useGetAttributesCollection(
    contract_address as string
  );

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
    searchValue,
    attributesFilter
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["NFT_COLLECTION"] });
  }, [priceSortType, sortStatus, minPrice, maxPrice, searchValue]);

  useEffect(() => {
    let nftsArr: IStagingNftResponse[] = [];

    nftsRes?.pages.map((page) => {
      nftsArr = [...nftsArr, ...page.items];
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

  const getAttributesCollection = async (contract_address: string) => {
    const res = await _getCollectionAttributes.mutateAsync(contract_address);
    setCollectionAtributes(res);
  };

  const changeTraitsActive = (traitFilter: IAttributesCollection) => {
    if (isFiltered(traitFilter.trait_type as string)) {
      const newTraitsActive = traitsActive.map((item) => {
        if (item.trait_type == traitFilter.trait_type) {
          return traitFilter;
        } else return item;
      });

      setTraitsActive(() => newTraitsActive);
    } else {
      setTraitsActive([...traitsActive, traitFilter]);
    }
  };

  const isFiltered = (key: string) => {
    let isKeyFiltered = false;
    traitsActive.forEach((traitActive) => {
      if (traitActive.trait_type == key) {
        isKeyFiltered = true;
      }
    });
    return isKeyFiltered;
  };

  useEffect(() => {
    setAttributesFilter(traitsActive);
  }, [traitsActive]);

  useEffect(() => {
    setTraitsActive([]);
    if (traitType && value) {
      setTraitsActive([{ trait_type: traitType, value: traitValue as string }]);
    }
  }, [traitType, traitValue]);

  const value = {
    collectionCount,
    collectionEconomic,
    collection,
    collectionAttributes,
    nfts,
    isLoading,
    isFetching,
    getCollectionData,
    fetchNextPage,
    hasNextPage,

    traitsActive,
    setTraitsActive,

    traitType,
    setTraitType,

    traitValue,
    setTraitValue,

    changeTraitsActive,

    setAttributesFilter,

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
