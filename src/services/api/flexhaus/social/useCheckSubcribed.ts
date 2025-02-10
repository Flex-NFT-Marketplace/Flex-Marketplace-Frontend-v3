import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useCheckSubcribed = () => {
  return useMutation({
    mutationKey: ["CHECK_SUBCRIBED"],
    mutationFn: async (creator: string) => {
   
        try {
            const {data}  = await axiosHausWithToken.get(`user/${creator}/check-subscribed`);

        return data.data;
        } catch (error) {
            
        }
 
    },
  });
};