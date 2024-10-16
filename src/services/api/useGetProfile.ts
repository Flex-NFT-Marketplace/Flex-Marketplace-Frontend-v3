import { IProfile } from "@/types/IProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async (address: string) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "accounts/" + address,
      );

      return data.data as IProfile;
    },
    retry: 1,
  });
};
