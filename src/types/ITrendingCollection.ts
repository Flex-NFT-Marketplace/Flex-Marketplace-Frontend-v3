interface NftCollection {
    name: string;
    avatar: string;
    cover: string;
    description: string;
    symbol: string;
  }
  
 export interface ITrendingCollection {
    totalVol: string;
    nftContract: string;
    oneDayChange: number;
    totalOwners: number;
    totalSupply: number;
    nftCollection: NftCollection;
  }