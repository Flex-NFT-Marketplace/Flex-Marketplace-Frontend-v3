import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useMutation } from "@tanstack/react-query";

export const useGetNft = () => {
  return useMutation({
    mutationKey: ["GET_NFT"],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
    }) => {
      const { data } = await axiosWithoutAccessToken.get("nft/get-nft", {
        params: {
          nftContract: bodyData.contract_address,
          tokenId: bodyData.token_id,
        }
      })
        
      return data.data as IStagingNftResponse;
    },
  });
};
