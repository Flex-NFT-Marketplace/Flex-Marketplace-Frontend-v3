import { ICreator } from "./Idrop"
import { IProfileStaging } from "./IStagingNft"

export type IPerks = {
    _id: string,
    creator: string,
    perks: string,
    startTime: number,
    snapshotTime: number,
    isCancelled: boolean,
    createdAt: string,
    updatedAt: string,
}

export type IPerksCreator = {
    _id: string,
    points: number,
    username: string,
    emailVerified: boolean,
    address: string,
    nonce: INonce,
    isVerified: boolean,
    isCreatorPayer: boolean,
    roles: string[],
    createdAt: string,
    updatedAt: string,
    mappingAddress: string,
}

export type INonce = {
    type: string,
    data: number[]
}

export type ILeaderboardItem = {
   amount: number,
   event: string,
   creator: IProfileStaging,
   rank: number,
   user: ICreator
}