import { axiosWithAccessToken } from "@/axiosConfig/axiosConfig";
import { ISignature } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query";

export const usePostSignature = () => {
  return useMutation({
    mutationKey: ["POST_SIGNATURE"],
    mutationFn: async (signature: ISignature) => {
      try {
        const { data } = await axiosWithAccessToken.post("signatures/create-signature", signature) 

        return data;
      } catch (error) {}
    },
  });
};
