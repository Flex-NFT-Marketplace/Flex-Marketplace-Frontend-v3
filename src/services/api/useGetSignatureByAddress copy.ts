import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetSignatureByAddress = () => {
  return useMutation({
    mutationKey: ["GET_SIGNATURE_BY_ADDRESS"],
    mutationFn: async (address: string) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "accounts/orders/" + address,
      );

      return data.data as ISignature[];
    },
  });
};

export default useGetSignatureByAddress;
