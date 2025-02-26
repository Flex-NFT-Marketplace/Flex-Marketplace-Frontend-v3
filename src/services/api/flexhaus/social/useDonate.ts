import { useMutation } from "@tanstack/react-query";
import { axiosHausWithToken } from "@/axiosConfig/axiosConfig";

export const useDonate = () => {
  return useMutation({
    mutationKey: ["DONATE"],
    mutationFn: async (body: {creator: string, amount: number}) => {

        const { data } = await axiosHausWithToken.post("flexhaus-event/donate",{
            creator: body.creator,
            amount: body.amount,
        },
        );
        console.log(data);
        
        return data.data;

    },
  });
};