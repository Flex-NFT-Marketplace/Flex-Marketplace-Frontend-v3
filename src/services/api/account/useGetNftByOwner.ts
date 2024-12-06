import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { IOrderData, IStagingNft } from "@/types/IStagingNft";
import { useMutation, } from "@tanstack/react-query";

export const useGetNftByOwner = () => {
  return useMutation({
    mutationKey: ["GET_NFT", ],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
      owner_address: string;
    }) => {
      const { data } = await axiosWithoutAccessToken.get("nft/get-nft", {
       params: {
        nftContract: bodyData.contract_address,
        tokenId: bodyData.token_id,
       }
      })
      return data.data as {
        nft: IStagingNft;
        collection: ICollection;
        orderData: IOrderData;
      };
    },
  });
};
