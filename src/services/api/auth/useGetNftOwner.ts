import { INft } from "@/types/INft";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetNftOwner = () => {
  return useMutation({
    mutationKey: ["GET_NFT_OWNER"],
    mutationFn: async (body?: { ownerAddress?: string }) => {
      if (!body?.ownerAddress) {
        throw new Error("Owner address is required");
      }

      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_HOST + `nft/owner/${body?.ownerAddress}`);

        return res.data.data as INft[];
      } catch (error) {
        return [];
      }
    },
    retry: 0,
  });
};
