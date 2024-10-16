import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetBidByAddress = () => {
  return useMutation({
    mutationKey: ["GET_SIGNATURE_BID_BY_ADDRESS"],
    mutationFn: async (address: string) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "accounts/bid/" + address,
      );

      return data.data as ISignature[];
    },
  });
};

export default useGetBidByAddress;
