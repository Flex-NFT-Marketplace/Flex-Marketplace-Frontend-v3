import { useMutation } from "@tanstack/react-query";
import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";

export const useGetDropDetail = () => {
  return useMutation({
    mutationKey: ["GET_DROP_DETAIL"],
    mutationFn: async (dropAddress: string) => {
    
        const { data } = await axiosHausNoToken.post("collectible/get-collectible-dropes", {
            page: 1,
            size: 1,
            collectible: dropAddress
          })
          console.log(data.data)
          
          return data.data.items[0]
    },
  });
};