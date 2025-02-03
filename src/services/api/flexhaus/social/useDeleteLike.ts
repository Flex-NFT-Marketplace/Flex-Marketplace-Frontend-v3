import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteLike = () => {
  return useMutation({
    mutationKey: ["DELETE_LIKE"],
    mutationFn: async (collectionId: string) => {
      try {
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_STAGING + "collectible/unlike-collectible",
          collectionId,
        );

        return data;
      } catch (error) {}
    },
  });
};