import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetIsOwnerNft = () => {
  return useMutation({
    mutationKey: ["GET_IS_OWNER_NFT"],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
      address: string;
    }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST +
          "nfts/" +
          bodyData.contract_address +
          "/" +
          bodyData.token_id +
          "/is_owner/" +
          bodyData.address,
      );

      return data.data as boolean;
    },
  });
};
