import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useGetPaymentWallet = () => {
  return useMutation({
    mutationKey: ["GET_PAYMENT_WALLET"],
    mutationFn: async () => {
        const { data } = await axiosHausWithToken.post("user/get-payment-wallet");
        console.log(data.data);
        
        return data.data;

    },
  });
};