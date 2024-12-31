import { axiosWithAccessToken } from "@/axiosConfig/axiosConfig";
import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface BodyProps {
  signatureId: string;
  transactionHash: string;
  buyerAddress: string,
  amount: number,
}

export const useActionBidNft = () => {
  return useMutation({
    mutationKey: ["PUT_SIGNATURE"],
    mutationFn: async (signature: BodyProps) => {
      try {
        const { data } = await axiosWithAccessToken.put("signatures/bid", signature)

        return data;
      } catch (error) {
        // console.log

        error;
      }
    },
  });
};
