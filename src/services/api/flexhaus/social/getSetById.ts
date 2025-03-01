import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { ISet } from "@/types/Idrop";

export const getSetById = () => {
  return useMutation({
    mutationKey: ["GET_SET_BY_ID"],
    mutationFn: async (setId: string) => {
   
        const {data} = await axiosHausNoToken.get(
         `flexhaus-drop/get-set-by-id/${setId}`
        );
        
        return data.data as ISet;

    },
  });
};