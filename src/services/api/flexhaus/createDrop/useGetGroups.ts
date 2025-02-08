import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useGetGroups = () => {
  return useMutation({
    mutationKey: ["GET_GROUPS"],
    mutationFn: async (creator: string) => {
      try {

        const payload = {
            page: 1,
            size: 50,
            creator: creator,
        };

        const { data } = await axiosHausWithToken.post("flexhaus-drop/get-sets", payload);

        return data.data;
      } catch (error) {}
    },
  });
};