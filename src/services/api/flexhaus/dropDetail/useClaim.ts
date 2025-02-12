import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useClaim = () => {
  return useMutation({
    mutationKey: ["CLAIM_COLLECTIBLE"],
    mutationFn: async (collectible: string) => {
       try {
        const { data } = await axiosHausWithToken.post("collectible/claim-collectible",{
            collectible: collectible,
          }
          );
          
          return data.data;
       } catch (error) {
            throw error;
       }
    },
  });
};