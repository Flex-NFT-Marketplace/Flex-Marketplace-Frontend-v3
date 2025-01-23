import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useMutation } from "@tanstack/react-query"

export const useGetPackOfOwner = () => {
    return useMutation({
        mutationKey: ["GET_PACK_OF_OWNER"],
        mutationFn: async (bodyData: {
          contract_address: string;
          ownerAddress: string;
        }) => {
          const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
        
                page: 1,
                size: 50,
                nftContract: bodyData.contract_address,
                owner: bodyData.ownerAddress
          
          })
            
          return data.data
        },
      });
}