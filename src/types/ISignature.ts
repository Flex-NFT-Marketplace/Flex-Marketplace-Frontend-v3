import { INft } from "./INft";

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
  contract_address: string;
  token_id: string;
  signature4: string;
  currency: string;
  nonce: number;
  price: number;
  amount: number;
  amount_sig: number;
  status: SignStatus;
  transaction_hash: string;
  transaction_status: string;
  sell_end: number;
  signer: string;
  buyer_address: string;
  nft: INft;
  createdAt?: string;
  updatedAt?: string;
}
