import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const usePostLike = () => {
  return useMutation({
    mutationKey: ["POST_LIKE"],
    mutationFn: async (collectionId: string) => {
      try {
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API + "collectible/like-collectible",
          collectionId,
        );

        return data;
      } catch (error) {}
    },
  });
};