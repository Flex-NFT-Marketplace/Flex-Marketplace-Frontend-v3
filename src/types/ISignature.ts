import { INft } from "./INft";
import { IStagingNft } from "./IStagingNft";

export enum SignStatusEnum {
  LISTING = "LISTING",
  BUYING = "BUYING",
  SOLD = "SOLD",
  BID = "BID",
  BIDDING = "BIDDING",
  CANCEL = "CANCEL",
}

export type SignStatus =
  | SignStatusEnum.BID
  | SignStatusEnum.BUYING
  | SignStatusEnum.CANCEL
  | SignStatusEnum.LISTING
  | SignStatusEnum.SOLD
  | SignStatusEnum.BIDDING;

export interface ISignature {
  _id?: string;
  nftContract: string;
  tokenId: string;
  signature4: string;
  currency: string;
  nonce: number;
  price: number;
  amount: number;
  amountSig: number;
  amount_sig?: number;
  status: SignStatus;
  transactionHash: string;
  transactionStatus: string;
  sellEnd: number;
  sell_end?: number;
  signer: string;
  buyer?: string;
  nft: IStagingNft;
  createdAt?: string;
  updatedAt?: string;
  buyerAddress?: string;
  
}
