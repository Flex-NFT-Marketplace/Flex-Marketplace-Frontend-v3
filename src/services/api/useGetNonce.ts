import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetNonce = () => {
  return useMutation({
    mutationKey: ["GET_NONCE"],
    mutationFn: async (address:string) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "accounts/nonce/" + address,
      );

      return data.data as number;
    },
  });
};
