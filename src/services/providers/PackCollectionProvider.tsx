"use client";

import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { IStagingNft, IStagingNftResponse } from "@/types/IStagingNft";
import { useGetAttributesCollection } from "../api/collection/useGetAttributesCollection";
import { ISignature } from "@/types/ISignature";
import { useGetPackOfOwner } from "../api/nft/useGetPackOfOwner";
import { useAccount } from "@starknet-react/core";

interface PackCollectionContextType {
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

  getBestBid: (nft: IStagingNftResponse) => ISignature | undefined;

  atemuPacks: IStagingNftResponse[];
  isMarket: boolean;
  setIsMarket: (isMarket: boolean) => void;

  packOfOwner: IStagingNftResponse[];
}

export const PackCollectionContext = createContext<
  PackCollectionContextType | undefined
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
  LISTING = "LISTING",
}

export type SortStatusType = SortStatusEnum.ALL | SortStatusEnum.LISTING;

export const PackCollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  //   const { contract_address } = useParams();
  const contract_address = process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string;
  const [collection, setCollection] = useState<IStagingCollection>();
  const [collectionEconomic, setCollectionEconomic] =
    useState<ICollectionEconomic>();

  const [collectionCount, setCollectionCount] = useState<ICollectionCounter>();
  const [collectionAttributes, setCollectionAtributes] = useState<
    IAttributesCollectionFilter[]
  >([]);
  const [nfts, setNfts] = useState<IStagingNftResponse[]>([]);
  const [atemuPacks, setAtemuPacks] = useState<IStagingNftResponse[]>([]);

  const [priceSortType, setPriceSortType] = useState<PriceSortType>(
    PriceSortEnum.ASC
  );

  const [sortStatus, setSortStatus] = useState<SortStatusType>(
    SortStatusEnum.ALL
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
  const [isMarket, setIsMarket] = useState<boolean>(true);
  const [packOfOwner, setPackOfOwner] = useState<IStagingNftResponse[]>([]);

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
  const _getPackOfOwner = useGetPackOfOwner();
  const { address } = useAccount();

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

  const getPackOfOwner = async (
    contract_address: string,
    ownerAddress: string
  ) => {
    const res = await _getPackOfOwner.mutateAsync({
      contract_address,
      ownerAddress,
    });
    console.log(res.items);
    setPackOfOwner(res.items);
  };

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
    if (isFiltered(traitFilter)) {
      const newTraitsActive: IAttributesCollection[] = [];
      traitsActive.forEach((trait) => {
        if (
          !(
            trait.trait_type == traitFilter.trait_type &&
            trait.value == traitFilter.value
          )
        )
          newTraitsActive.push(trait);
      });
      setTraitsActive(newTraitsActive);
    } else {
      setTraitsActive([...traitsActive, traitFilter]);
    }
  };

  const { data: atemuPacksRes } = useGetNFTCollection(
    process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
    priceSortType,
    sortStatus
  );

  useEffect(() => {
    if (atemuPacksRes) {
      console.log(atemuPacksRes.pages[0].items);

      setAtemuPacks(atemuPacksRes.pages[0].items);
    }
  }, [atemuPacksRes]);

  const isFiltered = (traitFilter: IAttributesCollection) => {
    let isKeyFiltered = false;
    traitsActive.forEach((traitActive) => {
      if (
        traitActive.trait_type == traitFilter.trait_type &&
        traitActive.value == traitFilter.value
      ) {
        isKeyFiltered = true;
      }
    });
    return isKeyFiltered;
  };

  const getBestBid = (nft: IStagingNftResponse): ISignature | undefined => {
    if (nft.orderData.listBid.length > 0) {
      return nft.orderData.listBid.reduce((maxBid, currentBid) => {
        return currentBid.price > maxBid.price ? currentBid : maxBid;
      }, nft.orderData.listBid[0]);
    }
    return undefined;
  };

  useEffect(() => {
    setAttributesFilter(convertAttributeFilter(traitsActive));
  }, [traitsActive]);

  const convertAttributeFilter = (traitsActive: IAttributesCollection[]) => {
    const map = new Map<string, string[]>();

    traitsActive.forEach((item) => {
      const trait = item.trait_type;

      if (!map.has(trait.toString())) {
        map.set(trait.toString(), []);
      }

      map.get(trait.toString())!.push(item.value.toString());
    });

    const converted: IAttributesCollection[] = [];

    map.forEach((values, trait) => {
      converted.push({ trait_type: trait, value: values });
    });
    console.log(converted);

    return converted;
  };

  // const a = [
  //   {
  //     trait_type: "abc",
  //     value: "1",
  //   },
  //   {
  //     trait_type: "abc",
  //     value: "2",
  //   },
  //   {
  //     trait_type: "abc",
  //     value: "3",
  //   },
  //   {
  //     trait_type: "xyz",
  //     value: "1"
  //   },
  //   {
  //     trait_type: "xyz",
  //     value: "2"
  //   }
  // ];

  // const b = [
  //   {
  //     trait_type: "abc",
  //     value: [1, 2, 3]
  //   },
  //   {
  //     trait_type: "xyz",
  //     value: [1, 2]
  //   },
  // ]

  useEffect(() => {
    if (address) {
      getPackOfOwner(
        process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
        address as string
      );
    }
  }, [address]);

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

    getBestBid,

    atemuPacks,

    isMarket,
    setIsMarket,

    packOfOwner,
  };

  return (
    <PackCollectionContext.Provider value={value}>
      {children}
    </PackCollectionContext.Provider>
  );
};

export const usePackCollectionContext = () => {
  const context = useContext(PackCollectionContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
