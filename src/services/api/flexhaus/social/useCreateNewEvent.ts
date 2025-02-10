import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useCreateNewEvent = () => {
  return useMutation({
    mutationKey: ["CREATE_NEW_EVENT"],
    mutationFn: async (body: {startTime: number, snapshotTime: number, perks: string}) => {

        const { data } = await axiosHausWithToken.post("flexhaus-event/create-new-event",body,
        );
        
        return data.data;

    },
  });
};