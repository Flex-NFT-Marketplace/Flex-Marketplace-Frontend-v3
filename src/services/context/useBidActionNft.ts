import { useAccount } from "@starknet-react/core";
import { addresses } from "./address";
import { convertEtherToWei } from "@/utils/string";
import { typedDataValidate } from "./type";
import { stark, uint256 } from "starknet";
import { useGetNftOwner721 } from "../api/nft/useGetNftOwner721";
import { ISignature, SignStatusEnum } from "@/types/ISignature";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { usePostSignature } from "../api/usePostSignature";
import { useCancelOrder } from "../api/nft/useCancelOrder";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

dayjs.extend(utc);

const useBidActionNft = () => {
  const { account, address, status } = useAccount();

  const { onShowToast } = useToast();

  const _getOwner721 = useGetNftOwner721();
  const _postSignature = usePostSignature();
  const _cancelOrder = useCancelOrder();

  const handleModifyTypedDataBidMessage = async (
    timeEnd: number,
    nonce: number,
    priceInEther: number,
    seller: string,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => {
    typedDataValidate.message.end_time = timeEnd;
    typedDataValidate.message.is_order_ask = "0";

    typedDataValidate.message.salt_nonce = nonce;
    typedDataValidate.message.collection = contract_address;
    typedDataValidate.message.price = convertEtherToWei(
      String(priceInEther),
    ).toString(); // Convert Ether to Wei

    typedDataValidate.message.signer = address;
    typedDataValidate.message.token_id = uint256.bnToUint256(token_id);
    // typedDataValidate.message.seller = seller;
    typedDataValidate.message.amount = amount.toString();
    typedDataValidate.message.currency = currency;
  };

  const handleOfferSignature = async (
    timeEnd: number,
    priceInEther: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => {
    const owner_address = await _getOwner721.mutateAsync({
      contract_address: contract_address,
      token_id: token_id,
    });

    let nonce = dayjs().utc().unix();

    await handleModifyTypedDataBidMessage(
      timeEnd,
      nonce,
      priceInEther,
      owner_address,
      amount,
      contract_address,
      token_id,
      currency,
    );

    try {
      let signature4 = await account?.signMessage(typedDataValidate);
      signature4 = stark.formatSignature(signature4);

      if (address && signature4) {
        const sign: ISignature = {
          contract_address,
          token_id,
          signature4: JSON.stringify(signature4),
          nonce: nonce,
          price: priceInEther,
          currency: currency,
          amount,
          amount_sig: amount,
          status: SignStatusEnum.BID,
          transaction_hash: "",
          transaction_status: "",
          sell_end: timeEnd,
          signer: address as string,
          buyer_address: owner_address,
          nft: {} as any,
        };

        await _postSignature.mutateAsync(sign);
      }
    } catch (err) {}
  };

  const handleApproveBid = async (
    time_end: number,
    price: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => {
    if (status == "connected") {
      const owner_address = await _getOwner721.mutateAsync({
        contract_address: contract_address,
        token_id: token_id,
      });

      try {
        await account?.execute({
          contractAddress: currency,
          entrypoint: "increaseAllowance",
          calldata: [
            addresses.marketplace.address,
            convertEtherToWei(String(price)).toString(),
            0,
          ],
        });

        await handleOfferSignature(
          time_end,
          price,
          amount,
          contract_address,
          token_id,
          currency,
        );
        onShowToast("Bid successfully");
      } catch (err) {
        onShowToast("Bid failed");
      }
    } else {
      onShowToast("Please connect your wallet");
    }
  };

  const onCancelOrder = async (singId: string): Promise<void> => {
    try {
      await _cancelOrder.mutateAsync(singId);
    } catch (error) {
      // console.log

      error;
    }
  };

  return { handleApproveBid, onCancelOrder };
};

export default useBidActionNft;
