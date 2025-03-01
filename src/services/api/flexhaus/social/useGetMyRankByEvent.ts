import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useGetMyRankByEvent = () => {
  return useMutation({
    
    mutationKey: ["GET_MY_RANK_BY_EVENT"],
    mutationFn: async (eventId: string) => {
   
        const {data} = await axiosHausWithToken.get(
         `flexhaus-event/get-user-ranking?eventId=${eventId}`
        );
        
        return data.data;

    },
  });
};