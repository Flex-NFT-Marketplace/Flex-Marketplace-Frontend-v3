import { shortString, typedData, uint256 } from "starknet";
import { addresses } from "./address";

export const typedDataValidate: any = {
  domain: {
    chainId: shortString.encodeShortString("SN_MAIN"),
    name: "Flex",
    version: "1",
  },
  message: {
    collection: "0x0",
    currency: addresses.ethToken.address,
    end_time: 9999999999,
    is_order_ask: 1,
    min_percentage_to_ask: "8500",
    salt_nonce: 0,
    params: "0",
    amount: "1",
    price: "0",
    // seller: "0x0",
    signer: "0x0",
    start_time: "0",
    strategy: addresses.strategyStandardSaleForFixedPrice.address,
    token_id: uint256.bnToUint256(9999),
  },
  primaryType: "MakerOrder",
  types: {
    MakerOrder: [
      {
        name: "is_order_ask",
        type: "u8",
      },
      {
        name: "signer",
        type: "felt",
      },
      {
        name: "collection",
        type: "felt",
      },
      {
        name: "price",
        type: "u128",
      },
      // {
      //   name: "seller",
      //   type: "felt",
      // },
      {
        name: "token_id",
        type: "u256",
      },
      {
        name: "amount",
        type: "u128",
      },
      {
        name: "strategy",
        type: "felt",
      },
      {
        name: "currency",
        type: "felt",
      },
      {
        name: "salt_nonce",
        type: "u128",
      },
      {
        name: "start_time",
        type: "u64",
      },
      {
        name: "end_time",
        type: "u64",
      },
      {
        name: "min_percentage_to_ask",
        type: "u128",
      },
      {
        name: "params",
        type: "felt",
      },
    ],
    u256: [
      { name: "low", type: "felt" },
      { name: "high", type: "felt" },
    ],
    StarkNetDomain: [
      {
        name: "name",
        type: "felt",
      },
      {
        name: "version",
        type: "felt",
      },
      {
        name: "chainId",
        type: "felt",
      },
    ],
  },
};
