import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetNonce = () => {
  return useMutation({
    mutationKey: ["GET_NONCE"],
    mutationFn: async (address?: string) => {
      if (!address) {
        throw new Error("Address is required");
      }

      const res = await axiosWithoutAccessToken.get("authentication/get-nonce", {
        params: {
          address: address,
        },
      })
      
      return res.data.data;
    },
    retry: 0,
  });
};

export default useGetNonce;
