import { erc1155Abi } from "@/constants/erc1155";
import { Contract, RpcProvider, num } from "starknet";
import { addresses } from "../../context/address";

const fetchBalanceERC1155 = async (
  contract_address: string,
  token_id: string,
  address: string,
) => {
  if (address == null) return;

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const nftContract = new Contract(erc1155Abi, contract_address, provider);

  const resERC1155 = await nftContract.balance_of(address, token_id, {
    parseResponse: true,
  });

  return num.toBigInt(resERC1155).toString() || 0;
};

export default fetchBalanceERC1155;
