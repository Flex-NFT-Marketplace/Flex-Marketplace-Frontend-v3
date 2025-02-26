import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useUnSubcribe = () => {
  return useMutation({
    mutationKey: ["UN_SUBCRIBE"],
    mutationFn: async (creator: string) => {
   
        const { data } = await axiosHausWithToken.delete("user/unsubscribe", {
            data: {
                creator: creator,
            }
        }
        );
        
        return data.data.isUnSubscribe;

    },
  });
};