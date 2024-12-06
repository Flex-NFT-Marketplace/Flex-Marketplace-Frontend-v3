interface NftCollection {
    name: string;
    avatar: string;
    cover: string;
    description: string;
    symbol: string;
    nftContract: string;
  }
  
 export interface ITrendingCollection {
    totalVol: string;
    oneDayVol: number;
    sevenDayVol: number;
    oneDayChange: number;
    totalOwners: number;
    totalSupply: number;
    nftCollection: NftCollection;
  }