import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useGetTotalLike = () => {
  return useMutation({
    mutationKey: ["GET_TOTAL_LIKE"],
    mutationFn: async (collectionId: string) => {
      try {
        const { data } = await axios.get(
          process.env.NEXT_PUBLIC_API_STAGING + "collectible/get-total-likes",
          {
            params: {
              collectionId,
            },
          }
        );

        return data;
      } catch (error) {}
    },
  });
};