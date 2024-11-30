import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";

const useGetAccessToken = () => {
  return useMutation({
    mutationKey: ["GET_ACCESS_TOKEN"],
    mutationFn: async (reqBody?: { address?: string; sign?: any, rpc: string }) => {
      if (!reqBody?.address) {
        throw new Error("Address is required");
      }

      if (!reqBody?.sign) {
        throw new Error("Sign is required");
      }

      if (!reqBody?.rpc) {
        throw new Error("RPC is required");
      }

      const res = await axiosWithoutAccessToken.post("authentication/token",
        {
          address: reqBody.address,
          signature: reqBody.sign,
          rpc: reqBody.rpc,
        },
      );

      return res.data.data as { token: string };
    },
    retry: 0,
  });
};

export default useGetAccessToken;