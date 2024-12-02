import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { useAccount } from "@starknet-react/core";
import { addresses } from "./address";
import { convertEtherToWei } from "@/utils/string";
import { num, uint256 } from "starknet";
import { typedDataValidate } from "./type";
import { useActionBidNft } from "../api/nft/useActionBidNft";
import { useNotify } from "../providers/NotifyProvider";
import { IStagingNft } from "@/types/IStagingNft";

const useAcceptBid = () => {
  const { status, account, address } = useAccount();
  const { onShowNotify } = useNotify();
  const handleSignature = (signature: any) => {
    return signature?.signature4 ? JSON.parse(signature?.signature4) : ["", ""];
  };

  const _putTransaction = useActionBidNft();

  const generateBidCalldataSignature = (
    signature: ISignature,
    nft: IStagingNft,
    amount: number,
  ) => {
    if (!signature) return null;

    return [
      "1", // takerAsk.isOrderAsk
      address, //   taker
      convertEtherToWei((signature.price * amount).toString()).toString(), //   price
      (typedDataValidate.message["tokenId.low"] = num.hexToDecimalString(
        uint256.bnToUint256(nft.tokenId).low.toString(),
      )), //   tokenId
      num.hexToDecimalString(uint256.bnToUint256(nft.tokenId).high.toString()), //   tokenId
      signature.amount, //   amount
      "8500", // minPercentageToAsk
      "0", // params
      "0", //   makerBid.isOrderAsk
      signature.signer, //   signer
      signature.contract_address, //   collection
      convertEtherToWei(signature.price.toString()).toString(), //   price
      // signature.buyer_address,
      (typedDataValidate.message["tokenId.low"] = num.hexToDecimalString(
        uint256.bnToUint256(nft.tokenId).low.toString(),
      )), //   tokenId
      num.hexToDecimalString(uint256.bnToUint256(nft.tokenId).high.toString()), //   tokenId
      signature.amount_sig, //   amount
      addresses.strategyStandardSaleForFixedPrice.address, //   strategy
      signature.currency, //   currency
      signature.nonce.toString(), //   nonce
      "0", //   startTime
      signature.sell_end, //   endTime
      "8500", //   minPercentageToAsk
      "0", //   params
      handleSignature(signature).length.toString(), //   makerAskSignature_len
      ...handleSignature(signature), // makerAskSignature
      // "0", //   customNonFungibleTokenRecipient
    ];
  };

  const onAcceptBid = async (
    signature: ISignature,
    nft: IStagingNft,
    amount: number,
  ) => {
    if (status == "connected") {
      try {
        const result = await account?.execute([
          {
            contractAddress: nft.nftContract || "",
            entrypoint: "setApprovalForAll",
            calldata: [addresses.transferManagerERC721.address, 0x1],
          },
          {
            contractAddress: nft.nftContract || "",
            entrypoint: "setApprovalForAll",
            calldata: [addresses.transferManagerERC1155.address, 0x1],
          },
          {
            contractAddress: addresses.marketplace.address,
            entrypoint: "match_bid_with_taker_ask",
            calldata:
              generateBidCalldataSignature(signature, nft, amount) || [],
          },
        ]);

        if (result?.transaction_hash) {
          const bodyData = {
            signature_id: signature._id || "",
            transaction_hash: result.transaction_hash || "",
          };

          await _putTransaction.mutateAsync(bodyData);
          onShowNotify("Accept bid successfully");
        } else {
        }
      } catch (error) {}
    } else {
    }
  };

  return { onAcceptBid };
};

export default useAcceptBid;
