import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCancelOrder = () => {
  return useMutation({
    mutationKey: ["DELETE_UNLIST"],
    mutationFn: async (signID: string) => {
      const { data } = await axios.put(
        process.env.NEXT_PUBLIC_API_HOST + "signatures/cancel_order/" + signID,
      );

      return data.data;
    },
  });
};
