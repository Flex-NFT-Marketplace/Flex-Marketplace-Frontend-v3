import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useCheckLiked = () => {
  return useMutation({
    mutationKey: ["CHECK_LIKED"],
    mutationFn: async (collectible: string) => {
      try {
        const { data } = await axiosHausWithToken.get("collectible/is-liked",{
            params: {
                collectible: collectible,
            }
        }
        );
        
        return data.data;
      } catch (error) {}
    },
  });
};