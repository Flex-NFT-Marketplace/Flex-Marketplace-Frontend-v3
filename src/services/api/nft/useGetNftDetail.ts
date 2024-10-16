import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetNftDetail = () => {
  return useMutation({
    mutationKey: ["GET_NFT_DETAIL"],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
    }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST +
          "nfts/detail/" +
          bodyData.contract_address +
          "/" +
          bodyData.token_id,
      );

      return data.data as {
        nft: INft;
      };
    },
  });
};
