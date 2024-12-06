import { stakingABI } from "@/types/abi/stakingABI";
import { Contract, RpcProvider, num } from "starknet";

const provider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
});

export const getStaked = async (address: string) => {
  try {
    const nftContract = new Contract(
      stakingABI,
      process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
      provider,
    );

    const nftsStaked = await nftContract.getItemStaked(address, {
      parseResponse: true,
    });

    let results = nftsStaked.map((item: any) => {
      return {
        contract_address: num.toHex(item.collection),
        token_id: item.tokenId.toString(),
      };
    });
    
    return results;
  } catch (error) {
    console.log(error);
  }
};
