import { ISignature } from "./ISignature";

export interface IBalance {
  contract_address: string;
  token_id: string;
  owner_address: string;
  balance: string;
}

export interface IAttributesCollection {
  trait_type: string | string[];
  value: string | string[];
}

export interface INft {
  signatures: ISignature | undefined;
  _id: string;
  nft_id: string;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  external_url: string;
  attributes: IAttributesCollection[];
  image_url: string;
  image_small_url: string;
  image_medium_url: string;
  animation_url: string;
  minted_by_address: string;
  minted_at_transaction_hash: string;
  minted_at_timestamp: string;
  balance: IBalance[];
}

export enum SchemaTypeEnum {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export interface INftCollection extends INft {
  signatures: ISignature;
}

