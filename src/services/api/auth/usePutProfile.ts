import { ACCESS_TOKEN } from "@/constants/cookies";
import { IProfile } from "@/types/IProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const usePutProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async (body: { profile: any; address: string }) => {
      const { data } = await axios.put(
        process.env.NEXT_PUBLIC_API_HOST + "accounts/" + body.address,
        body.profile,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
          },
        },
      );

      return data.data as IProfile;
    },
    retry: 1,
  });
};
