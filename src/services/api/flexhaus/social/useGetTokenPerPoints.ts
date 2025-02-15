import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetTokenPerPoints = () => {
  return useMutation({
    mutationKey: ["GET_TOKEN_PER_POINTS"],
    mutationFn: async () => {
   
        const { data } = await axiosHausNoToken.post(`system/get-point-price`);
        return data.data as { strkPerPoint: number, ethPerPoint: number };

    },
  });
};