import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetTotalSub = () => {
  return useMutation({
    mutationKey: ["GET_TOTAL_SUB"],
    mutationFn: async (creator: string) => {
   
        const { data } = await axiosHausNoToken.get(`user/${creator}/total-subscription`);

        return data.data;

    },
  });
};