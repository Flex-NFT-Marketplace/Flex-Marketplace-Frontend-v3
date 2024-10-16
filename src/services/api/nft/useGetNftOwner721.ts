import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetNftOwner721 = () => {
  return useMutation({
    mutationKey: ["GET_OWNER_NFT"],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
    }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST +
          "nfts/owner/" +
          bodyData.contract_address +
          "/" +
          bodyData.token_id,
      );

      return data.data as string;
    },
  });
};
