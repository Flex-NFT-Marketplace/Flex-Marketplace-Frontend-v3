import { IStaking } from "../../types/IStaking";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePutUnStakeNFT = () => {
  return useMutation({
    mutationKey: ["PUT_UNSTAKING_NFT"],
    mutationFn: async (bodyData: {
      owner_address: string;
      nft_id: string;
      tx_hash: string;
    }) => {
      try {
        const { data } = await axios.put(
          process.env.NEXT_PUBLIC_API_HOST + "staking/unstake/",
          bodyData,
        );

        return data;
      } catch (error) {}
    },
  });
};
