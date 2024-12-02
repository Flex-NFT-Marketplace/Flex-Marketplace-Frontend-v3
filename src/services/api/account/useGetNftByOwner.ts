import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IOrderData, IStagingNft } from "@/types/IStagingNft";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetNftByOwner = () => {
  return useMutation({
    mutationKey: ["GET_NFT", ],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
      owner_address: string;
    }) => {
      const { data } = await axiosWithoutAccessToken.post("nft/get-nft", {
        nftContract: bodyData.contract_address,
        tokenId: bodyData.token_id,
        owner: bodyData.owner_address,
      })
      console.log(data.data);
      
      return data.data as {
        nft: IStagingNft;
        collection: ICollection;
        orderData: IOrderData;
      };
    },
  });
};
