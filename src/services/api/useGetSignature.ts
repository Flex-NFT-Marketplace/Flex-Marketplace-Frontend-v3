import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetSignature = () => {
  return useMutation({
    mutationKey: ["GET_SIGNATURE"],
    mutationFn: async (body: {
      contract_address: string;
      token_id: string;
    }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST +
          "signatures/" +
          body.contract_address +
          "/" +
          body.token_id,
      );

      return data.data as ISignature;
    },
    retry: 1,
  });
};
