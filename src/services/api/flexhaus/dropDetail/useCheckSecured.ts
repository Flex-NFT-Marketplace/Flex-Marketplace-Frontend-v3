import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useCheckSecured = () => {
  return useMutation({
    mutationKey: ["CHECK_SECURED"],
    mutationFn: async (collectible: string) => {
        const { data } = await axiosHausWithToken.post("collectible/get-secured-collectibles",{
          page: 1,
          size: 1,
          collectible: collectible,
        }
        );
        
        return data.data.items.length > 0;
    },
  });
};