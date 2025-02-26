import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useSecure = () => {
  return useMutation({
    mutationKey: ["SECURE_COLLECTIBLE"],
    mutationFn: async (collectible: string) => {
        const { data } = await axiosHausWithToken.post("collectible/secure-collectible",{
        
          collectible: collectible,
        }
        );
        
        return data;
    },
  });
};