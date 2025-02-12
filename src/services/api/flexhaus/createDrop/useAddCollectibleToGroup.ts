import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useAddCollectibleToGroup = () => {
  return useMutation({
    mutationKey: ["ADD_COLLECTIBLE_TO_GROUP"],
    mutationFn: async (body: { setId: string, collectible: string }) => {
      
        const { data } = await axiosHausWithToken.post("flexhaus-drop/add-collectible",body);

        return data.data;
  
    },
  });
};