import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IProfileStaging } from "@/types/IStagingNft";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async (address: string) => {
      try {
        const {data} = await axiosWithoutAccessToken.get(`user/info`, {
          params: {
            address: address,
          }
        })
        
        return data.data as IProfileStaging;
      } catch (error) {
        return null;
      }
   
    },
    retry: 1,
  });
};
