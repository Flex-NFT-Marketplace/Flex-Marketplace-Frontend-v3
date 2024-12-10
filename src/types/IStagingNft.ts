import { IAttributesCollection } from "./INft";
import { ISignature } from "./ISignature";

  interface NftCollection {
    avatar: string;
    description: string;
    key: string;
    name: string;
    standard: string;
    symbol: string;
    verified: boolean;
    _id: string;
  }
  
  export interface IProfileStaging {
    address: string;
    isVerified: string;
    username: string;
    _id: boolean;
  }
  
  // Define the main NFT item type.
  export interface IStagingNft {
    amount: number;
    attributes: IAttributesCollection[];
    blockTime: number;
    burnedAt: string | null;
    chain: string;
    createdAt: string;
    creator: string;
    description: string;
    image: string;
    isBurned: boolean;
    marketType: string;
    name: string;
    nftCollection: NftCollection;
    nftContract: string;
    owner: IProfileStaging;
    royaltyRate: number;
    tokenId: string;
    tokenUri: string;
    _id: string;
    signature4: string,
    orderData: IOrderData;
  }

  export interface IStagingNftResponse {
    nftData: IStagingNft;
    orderData: IOrderData;
  }
  export interface IOrderData {
    bestAsk: ISignature;
    listAsk: ISignature[];
    listBid: ISignature[];
  }
