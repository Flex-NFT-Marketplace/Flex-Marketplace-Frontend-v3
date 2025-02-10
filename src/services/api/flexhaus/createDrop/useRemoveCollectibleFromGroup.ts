import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useRemoveCollectibleFromGroup = () => {
  return useMutation({
    mutationKey: ["REMOVE_COLLECTIBLE_FROM_GROUP"],
    mutationFn: async (body: { setId: string, collectible: string }) => {
      
        const { data } = await axiosHausWithToken.post("flexhaus-drop/remove-collectible",body);

        return data;
   
    },
  });
};