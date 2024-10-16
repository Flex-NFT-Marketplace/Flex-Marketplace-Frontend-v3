import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetSignatureBid = () => {
  return useMutation({
    mutationKey: ["GET_SIGNATURE_BID"],
    mutationFn: async (body: {
      contract_address: string;
      token_id: string;
    }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST +
          "signatures/bid/" +
          body.contract_address +
          "/" +
          body.token_id,
      );

      return data.data as ISignature;
    },
    retry: 1,
  });
};
