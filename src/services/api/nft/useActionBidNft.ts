import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface BodyProps {
  signature_id: string;
  transaction_hash: string;
}

export const useActionBidNft = () => {
  return useMutation({
    mutationKey: ["PUT_SIGNATURE"],
    mutationFn: async (signature: BodyProps) => {
      try {
        const { data } = await axios.put(
          process.env.NEXT_PUBLIC_API_HOST + "signatures/bid",
          signature,
        );

        return data;
      } catch (error) {
        // console.log

        error;
      }
    },
  });
};
