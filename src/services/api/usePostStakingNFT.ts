import { IStaking } from "./../../types/IStaking";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostStakingNFT = () => {
  return useMutation({
    mutationKey: ["POST_STAKING_NFT"],
    mutationFn: async (staking: IStaking) => {
      try {
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_HOST + "staking",
          staking,
        );

        return data;
      } catch (error) {}
    },
  });
};
