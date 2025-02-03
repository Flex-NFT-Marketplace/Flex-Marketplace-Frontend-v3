import { useAccount } from "@starknet-react/core";
import { usePostSignature } from "../api/usePostSignature";
import { RpcProvider, num, uint256 } from "starknet";
import { ISignature } from "@/types/ISignature";
import { convertEtherToWei } from "@/utils/string";
import { INft } from "@/types/INft";
import { addresses } from "./address";
import { useActionBuyNft } from "../api/nft/useActionBuyNft";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { IStagingNft } from "@/types/IStagingNft";

type BuyActionNftProps = {
  onBuy: (signature: ISignature) => void;
};

export const useBuyActionNft = () => {
  const _putSignature = useActionBuyNft();
  const { onShowToast } = useToast();
  const { address, status, account } = useAccount();

  const handleSignature = (signature: any) => {
    return signature?.signature4 ? JSON.parse(signature?.signature4) : ["", ""];
  };

  const callDataBuyNowSignature = (
    signature: ISignature,
    nft: IStagingNft,
    amount: number,
  ) => {
    return [
      "0", // is_order_ask
      address, //   taker
      convertEtherToWei((signature?.price * amount).toString()).toString(), // final price for the purchase
      num.hexToDecimalString(uint256.bnToUint256(nft?.tokenId).low.toString()), //   token_id - low
      num.hexToDecimalString(
        uint256.bnToUint256(nft?.tokenId).high.toString(),
      ), //   token_id - high
      amount, //   amount
      "8500", // min_percentage_to_ask
      "0", // params
      "1", //   is_order_ask
      signature?.signer, //   signer
      nft?.nftContract, //   collection
      convertEtherToWei(
        (signature!.price * (signature!.amount_sig || 1)).toString(),
      ).toString(), //   price
      // signature.signer,
      num.hexToDecimalString(uint256.bnToUint256(nft?.tokenId).low.toString()), //   tokenId - low
      num.hexToDecimalString(
        uint256.bnToUint256(nft?.tokenId).high.toString(),
      ), //   tokenId - high
      signature.amount_sig, //   amount
      addresses.strategyStandardSaleForFixedPrice.address, //   strategy
      signature.currency, //   currency
      // addresses.ethToken.address,
      signature?.nonce.toString(), //   nonce
      "0", //   start_time
      Number(signature.sell_end), //   end_time
      "8500", //   min_percentage_to_ask
      "0", //   params
      handleSignature(signature).length.toString(), //   makerAskSignature_len
      ...handleSignature(signature), // makerAskSignature
      "0", //   customNonFungibleTokenRecipient
    ];
  };

  const onBuy = async (signature: ISignature, nft: IStagingNft, amount: number) => {
    if (status == "connected") {
      try {
        console.log(convertEtherToWei(
          (signature?.price * amount).toString(),
        ).toString(),);
        const result = await account?.execute([
          {
            contractAddress: signature?.currency,
            entrypoint: "approve",
            calldata: [
              addresses.marketplace.address,
              convertEtherToWei(
                (signature?.price * amount).toString(),
              ).toString(),
              0,
            ],
          },
          {
            contractAddress: addresses.marketplace.address,
            entrypoint: "match_ask_with_taker_bid",
            calldata: callDataBuyNowSignature(signature, nft, amount),
          },
        ]);
        console.log(result);
        
        if (result?.transaction_hash) {
          const bodyData = {
            signatureId: signature._id as string,
            transactionHash: result.transaction_hash || "",
            buyerAddress: address || "",
            amount: amount,
          };

          await _putSignature.mutateAsync(bodyData);
          onShowToast("Buy NFT successfully");
        } else {
          onShowToast("Buy NFT failed");
        }
      } catch (error) {
        console.log(error);
        
        onShowToast("Buy NFT failed");
      }
    } else {
    }
  };

  return { onBuy };
};
