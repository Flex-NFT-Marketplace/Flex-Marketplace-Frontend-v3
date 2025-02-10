import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useSubcribe = () => {
  return useMutation({
    mutationKey: ["SUBCRIBE"],
    mutationFn: async (creator: string) => {
   
        const { data } = await axiosHausWithToken.put("user/subscribe", {
            creator: creator,
        }
        );

        return data.data.isUnSubscribe;

    },
  });
};