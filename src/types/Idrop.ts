import { IProfileStaging } from "./IStagingNft";

export type IDropGroup = {
    _id: string,
    isDistributed: boolean,
    collectibles: ICollectible[],
    creator: ICreator
    startTime: number,
    expiryTime: number,
}

export type ICreator = {
    address: string;
    isVerified: boolean;
    username: string;
    _id: string;
    
}

export type ICollectible = {
    attributesMap: any[];
    dropAmount: number;
    key: string;
    name: string;
    nftContract: string;
    rarity: "common" | "rare" | "legendary" | "ultimate";
    standard: string;
    status: string;
    symbol: string;
    verified: boolean;
    _id: string;
}

export type IdropDetail = {

    _id: string;
    collectible: ICollectible;
    creator: IProfileStaging;
    dropType: string;
    fromTopSupporter: number;
    toTopSupporter: number;
    set: ISet;
    isRandomToSubscribers: boolean;
    secureAmount: number;
    createdAt: string;
    updatedAt: string;
}

export type ISet = {
    _id: string;
    startTime: number;
    expiryTime: number;
    creator: string;
    event: string | null;
    isDistributed: boolean;
    collectibles: string[];
}

export type ICollectibleState = {
    _id: string,
    user: string,
    collectible: ICollectible
    isSecured: boolean,
    isDistributed: boolean,
    isClaimed: boolean,
}