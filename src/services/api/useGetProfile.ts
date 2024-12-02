import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IProfile } from "@/types/IProfile";
import { IProfileStaging } from "@/types/IStagingNft";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async (address: string) => {
      const {data} = await axiosWithoutAccessToken.get(`user/info`, {
        params: {
          address: address,
        }
      })
      
      return data.data as IProfileStaging;
    },
    retry: 1,
  });
};
