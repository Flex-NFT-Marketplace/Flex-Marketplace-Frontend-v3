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

export interface IStatsCollection {
  collection_best_offer: number;
  nft_count: number;
  owner_count: number;
  asset_count: number;
  total_volume: number;
  total_listing_count: number;
  collection_floor_price: number;
  stats1D: IStatsDetail;
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
