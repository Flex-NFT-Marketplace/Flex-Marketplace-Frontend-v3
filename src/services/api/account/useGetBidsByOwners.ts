import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import { useMutation } from "@tanstack/react-query"

const useGetBidsByOwner = () => {
    return useMutation({
        mutationKey: ["GET_LISTING_OWNER"],
        mutationFn: async (bodyData: {
            ownerAddress: string,
            status: SignStatusEnum;
        }) => {
            const { data } = await axiosWithoutAccessToken.get("user/activity", {
                params: {
                    page: 1,
                    size: 50,
                    userAddress: bodyData.ownerAddress,
                    status: bodyData.status
                }
            })

            return data.data.items as ISignature[];
            
        }
    })
} 

export default useGetBidsByOwner;