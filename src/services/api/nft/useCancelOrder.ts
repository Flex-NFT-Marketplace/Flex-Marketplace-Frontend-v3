import { axiosWithAccessToken } from "@/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";

export const useCancelOrder = () => {
  return useMutation({
    mutationKey: ["DELETE_UNLIST"],
    mutationFn: async (signID: string) => {
      const { data } = await axiosWithAccessToken.put("signatures/cancel-order/" + signID, {
        signatureId: signID,
      })

      return data.data;
    },
  });
};
