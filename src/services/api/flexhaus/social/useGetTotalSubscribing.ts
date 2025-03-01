import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetTotalSubscribing = () => {
  return useMutation({
    mutationKey: ["GET_TOTAL_SUBSCRIBING"],
    mutationFn: async (creator: string) => {
   
        const { data } = await axiosHausNoToken.get(`user/${creator}/total-subscribing`);

        return data.data;

    },
  });
};