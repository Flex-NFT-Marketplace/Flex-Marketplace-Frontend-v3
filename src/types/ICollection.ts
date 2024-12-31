export interface IStatusCollection {
  is_active: boolean;
  is_banner: boolean;
  is_verified: boolean;
  is_new_collection: boolean;
  is_trending: boolean;
  is_18: boolean;
  banner_prioritize: number;
}

export interface IStatsDetail {
  sale_count: number;
  volume: number;
  avg_price: number;
}

export interface IStagingCStatsDetail {
  saleCount: number;
  volume: number;
  avgPrice: number;
  volChange: number;
}

export interface IStatsCollection {
  _id: string;
  nftContract: string;
  bestOffer: number;
  floorPrice: number;
  lastUpdated: number;
  nftCount: number;
  ownerCount: number;
  totalListingCount: number;
  totalVolume: number;
  stats1D: IStagingCStatsDetail;
  stats7D: IStagingCStatsDetail;
}

export interface ICollection {
  contract_address: string;

  schema: string;

  name: string;

  description: string;

  symbol: string;

  external_url: string;

  image_url: string;

  banner_url: string;

  stats: IStatsCollection;

  status: IStatusCollection;
}
