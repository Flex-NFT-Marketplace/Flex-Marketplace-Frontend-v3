import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useDeleteLike = () => {
  return useMutation({
    mutationKey: ["DELETE_LIKE"],
    mutationFn: async (collectible: string) => {
     
        const { data } = await axiosHausWithToken.delete(
           "collectible/unlike-collectible",
          {
            data: {
              collectible: collectible,
            }
          }
        );

        return data;
  
    },
  });
};