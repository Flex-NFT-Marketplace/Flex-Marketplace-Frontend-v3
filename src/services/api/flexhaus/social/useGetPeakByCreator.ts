import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetPeakByCreator = () => {
  return useMutation({
    mutationKey: ["GET_PEAK_BY_CREATOR"],
    mutationFn: async (creator: string) => {
   
        const {data} = await axiosHausNoToken.get(
         "flexhaus-event/get-current-event",
          {
            params: {
                creator,
            },
          }
        );
        
        return data;

    },
  });
};