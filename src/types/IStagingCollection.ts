import { IStatsCollection, IStatusCollection } from "./ICollection";

export type IStagingCollection = {
    nftContract: string,

    standard: string;

    name: string;

    description: string;

    symbol: string;

    external_url: string;

    avatar: string;

    cover: string;
    
    nftCollectionStats: IStatsCollection;

    status: IStatusCollection;

    traits: ITraits[];
  };


export interface ITraitsItem {
  value: string;
  count: number;
}

export interface ITraits {
  trait_type: string;
  traits: ITraitsItem[];
}

export interface ICollectionEconomic {
  totalVol: string,
  oneDayVol: number,
  sevenDayVol: number,
  oneDayChange: number,
  sevenDayChange: number,
  nftCollection: IStagingCollection,
}


export interface ICollectionCounter {
  owners: number, // number of owner
  supply: number, // total supply
}