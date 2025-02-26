import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetTotalLike = () => {
  return useMutation({
    mutationKey: ["GET_TOTAL_LIKE"],
    mutationFn: async (collectionAddress: string) => {
      try {
        const { data } = await axiosHausNoToken.get(
          "collectible/get-total-likes",
          {
            params: {
              collectible: collectionAddress,
            },
          }
        );
        return data.data;
      } catch (error) {}
    },
  });
};