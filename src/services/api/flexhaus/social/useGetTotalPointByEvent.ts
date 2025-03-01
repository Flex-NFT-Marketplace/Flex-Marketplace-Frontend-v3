import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetTotalPointByEvent = () => {
  return useMutation({
    mutationKey: ["GET_TOTAL_POINT_BY_EVENT"],
    mutationFn: async (eventId: string) => {
   
        const {data} = await axiosHausNoToken.get(
         `flexhaus-event/get-total-points?eventId=${eventId}`
        );
        console.log(data);
        
        return data.data;

    },
  });
};