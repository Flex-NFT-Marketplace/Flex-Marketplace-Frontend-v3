import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { IProfileStaging } from "@/types/IStagingNft";

export const useGetRandomCreator = () => {
  return useMutation({
    mutationKey: ["GET_RAMDOM_CREATOR"],
    mutationFn: async () => {
        const { data } = await axiosHausNoToken.post("user/get-random-creators");
        console.log(data);
        
        return data.data as IProfileStaging[];

    },
  });
};