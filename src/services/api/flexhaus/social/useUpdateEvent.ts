import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useUpdateEvent = () => {
  return useMutation({
    mutationKey: ["UPDATE_EVENT"],
    mutationFn: async (body: {eventId: string, startTime: number, snapshotTime: number, perks: string}) => {
   
        const { data } = await axiosHausWithToken.post("flexhaus-event/update-event",body,
        );

        return data.data;
 
    },
  });
};