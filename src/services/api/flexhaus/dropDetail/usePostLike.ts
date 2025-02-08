import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const usePostLike = () => {
  return useMutation({
    mutationKey: ["POST_LIKE"],
    mutationFn: async (collectible: string) => {
      try {
        const { data } = await axiosHausWithToken.post("collectible/like-collectible",
          {
            collectible: collectible,
          }
        );

        return data;
      } catch (error) {}
    },
  });
};