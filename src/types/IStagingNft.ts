import { IAttributesCollection } from "./INft";

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
  
  interface Owner {
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
    owner: Owner;
    royaltyRate: number;
    tokenId: string;
    tokenUri: string;
    _id: string;
  }