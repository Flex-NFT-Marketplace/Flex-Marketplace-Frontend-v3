import { Contract, RpcProvider, stark, uint256 } from "starknet";
import { addresses } from "./address";
import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { erc721Abi } from "@/constants/erc721";
import { typedDataValidate } from "./type";
import { convertEtherToWei } from "@/utils/string";
import { usePostSignature } from "../api/usePostSignature";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import { useGetNonce } from "../api/useGetNonce";
import useGetBalanceERC1155 from "../api/nft/useGetBalanceERC1155";

import { useCancelOrder } from "../api/nft/useCancelOrder";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import fetchBalanceERC1155 from "../api/nft/useGetBalanceERC1155";
import { useRouter } from "next/navigation";
import { INft } from "@/types/INft";
import { useNotify } from "../providers/NotifyProvider";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

dayjs.extend(utc);

export enum ActionStatus {
  CANNOT_TRANSFER = "CANNOT_TRANSFER",
  CHECKING_APPROVAL = "CHECKING_APPROVAL",
  APPROVING = "APPROVING",
  APPROVED = "APPROVED",
  NOT_APPROVED = "NOT_APPROVED",
  BUYING = "BUYING",
  PENDING_SIGNATURE = "PENDING_SIGNATURE",
}

type ActionStatusType =
  | ActionStatus.CANNOT_TRANSFER
  | ActionStatus.CHECKING_APPROVAL
  | ActionStatus.APPROVING
  | ActionStatus.APPROVED
  | ActionStatus.NOT_APPROVED
  | ActionStatus.BUYING
  | ActionStatus.PENDING_SIGNATURE;

export type BuyActionNftType = {
  checkApprovalCollection: (
    contractAddress: string,
    accountAddress: string,
  ) => void;
  status: ActionStatusType;
  approveCollection: (
    timeEnd: number,
    priceInEther: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => Promise<void>;

  onListing: (
    timeEnd: number,
    priceInEther: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => Promise<void>;
  onCancelOrder: (singId: string) => Promise<void>;
  getBalanceERC1155: (
    contract_address: string,
    token_id: string,
    address: string,
  ) => Promise<any>;
  txApproved: string;
};

const handleModifyTypedDataMessage = async (
  timeEnd: number,
  nonce: number,
  priceInEther: number,
  seller: string,
  amount: number,
  contract_address: string,
  token_id: string,
  listing_address: string,
  currency: string,
) => {
  typedDataValidate.message.end_time = timeEnd;

  typedDataValidate.message.salt_nonce = nonce;
  typedDataValidate.message.collection = contract_address;
  typedDataValidate.message.price = convertEtherToWei(
    String(priceInEther * amount),
  ).toString(); // Convert Ether to Wei

  typedDataValidate.message.signer = listing_address;
  // typedDataValidate.message.seller = seller;
  typedDataValidate.message.token_id = uint256.bnToUint256(token_id);
  typedDataValidate.message.amount = amount.toString();
  typedDataValidate.message.currency = currency;
};

const useListActionNft = (): BuyActionNftType => {
  const { address, status, account } = useAccount();
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const { onShowToast } = useToast();

  const _postSignature = usePostSignature();
  const _cancelOrder = useCancelOrder();

  const [statusFlow, setStatus] = useState<ActionStatusType>(
    ActionStatus.CHECKING_APPROVAL,
  );
  const [txApproved, setTxApproved] = useState<string>("");

  const checkApprovalCollection = async (
    contractAddress: string,
    accountAddress: string,
  ) => {
    setStatus(ActionStatus.CHECKING_APPROVAL);

    try {
      const nftContract = new Contract(erc721Abi, contractAddress, provider);
   
      const formatAnswer = { isApproved: "string" };

      const resERC721 = await nftContract.isApprovedForAll(
        accountAddress,
        addresses.transferManagerERC721.address,
        { parseResponse: true },
      );

      const resERC1155 = await nftContract.isApprovedForAll(
        accountAddress,
        addresses.transferManagerERC1155.address,
        { parseResponse: true, formatResponse: formatAnswer },
      );
      
      if (resERC721.isApproved === "1" || resERC1155.isApproved === "1") {
        setStatus(ActionStatus.APPROVED);
      } else {
        setStatus(ActionStatus.NOT_APPROVED);
      }
    } catch (error) {
      setStatus(ActionStatus.CANNOT_TRANSFER);
    }
  };

  const approveCollection = async (
    timeEnd: number,
    priceInEther: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => {
    setStatus(ActionStatus.APPROVING);

    try {
      if (status == "connected") {
        try {
          setStatus(ActionStatus.PENDING_SIGNATURE);

          let res: any = await account?.execute([
            {
              contractAddress: contract_address || "",
              entrypoint: "setApprovalForAll",
              calldata: [addresses!.transferManagerERC721.address, 0x1],
            },
            {
              contractAddress: contract_address || "",
              entrypoint: "setApprovalForAll",
              calldata: [addresses!.transferManagerERC1155.address, 0x1],
            },
          ]);

          setStatus(ActionStatus.APPROVING);
          setTxApproved(res.transaction_hash);

          await provider.waitForTransaction(res.transaction_hash);

          setStatus(ActionStatus.APPROVED);

          await onListing(
            timeEnd,
            priceInEther,
            amount,
            contract_address || "",
            token_id || "",
            currency,
          );
        } catch (err) {
          setStatus(ActionStatus.NOT_APPROVED);
        }
      } else {
        onShowToast("Please connect wallet.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = (contract_address: string, token_id: string) => {
    onNavigate("/starknet/asset/" + contract_address + "/" + token_id);
  };

  const onListing = async (
    timeEnd: number,
    priceInEther: number,
    amount: number,
    contract_address: string,
    token_id: string,
    currency: string,
  ) => {
    try {
      if (priceInEther <= 0) {
        onShowToast("Price must be greater than 0");
        return;
      }

      if (amount <= 0) {
        onShowToast("Amount must be greater than 0");
        return;
      }
      setStatus(ActionStatus.PENDING_SIGNATURE);

      let nonce = dayjs().utc().unix();

      await handleModifyTypedDataMessage(
        timeEnd,
        nonce,
        priceInEther,
        address as string,
        amount,
        contract_address,
        token_id,
        address as string,
        currency,
      );

      let signature4 = await account!.signMessage(typedDataValidate);
      signature4 = stark.formatSignature(signature4);

      const sign: ISignature = {
        contract_address,
        token_id,
        signature4: JSON.stringify(signature4),
        nonce: nonce,
        price: priceInEther,
        currency: currency,
        amount,
        amount_sig: amount,
        status: SignStatusEnum.LISTING,
        transaction_hash: "",
        transaction_status: "",
        sell_end: timeEnd,
        signer: address as string,
        buyer_address: "",
        nft: {} as any,
      };

      await _postSignature.mutateAsync(sign);
      onNavigateDetail(contract_address, token_id);
      onShowToast("Listing successfully");
      return;
    } catch (error) {}
  };

  const onCancelOrder = async (singId: string): Promise<void> => {
    try {      
      await _cancelOrder.mutateAsync(singId);
      onShowToast("Cancel order successfully");
    } catch (error) {}
  };

  const getBalanceERC1155 = async (
    contract_address: string,
    token_id: string,
    address: string,
  ) => {
    return await fetchBalanceERC1155(contract_address, token_id, address);
  };

  return {
    checkApprovalCollection,
    status: statusFlow,
    approveCollection,
    onListing,
    onCancelOrder,
    getBalanceERC1155,
    txApproved,
  };
};

export default useListActionNft;
