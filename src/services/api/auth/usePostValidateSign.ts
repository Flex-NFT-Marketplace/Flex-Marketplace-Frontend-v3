import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostValidateSign = () => {
  return useMutation({
    mutationKey: ["POST_VALIDATE"],
    mutationFn: async (reqBody?: { address?: string; sign?: any }) => {
      if (!reqBody?.address) {
        throw new Error("Address is required");
      }

      if (!reqBody?.sign) {
        throw new Error("Sign is required");
      }

      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_HOST + "auth/validate",
        {
          address: reqBody.address,
          signature: reqBody.sign,
        },
      );

      return res.data.data as { accessToken: string };
    },
    retry: 0,
  });
};

export default usePostValidateSign;
