import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useCreateNewGroup = () => {
  return useMutation({
    mutationKey: ["CREATE_NEW_GROUP"],
    mutationFn: async (body: { collectible: string, startDate: number, 
        expiryDate: number }) => {
 
        const { data } = await axiosHausWithToken.post("flexhaus-drop/create-new-set", {
          collectible: body.collectible,
          startTime: body.startDate, 
          expiryTime: body.expiryDate,
        });

        return data;
      
    },
  });
};