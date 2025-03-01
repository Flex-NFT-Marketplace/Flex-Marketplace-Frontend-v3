import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { IProfileStaging } from "@/types/IStagingNft";

export const useGetHighlightCreator = () => {
  return useMutation({
    mutationKey: ["GET_HIGHLIGHT_CREATOR"],
    mutationFn: async () => {
        const { data } = await axiosHausNoToken.post("user/get-highlights-creators");
        console.log(data);
        
        return data.data as IProfileStaging[];

    },
  });
};