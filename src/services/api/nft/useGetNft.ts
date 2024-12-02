import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingCollection } from "@/types/IStagingCollection";
import { IStagingNft } from "@/types/IStagingNft";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetNft = () => {
  return useMutation({
    mutationKey: ["GET_NFT"],
    mutationFn: async (bodyData: {
      contract_address: string;
      token_id: string;
    }) => {
      const res = await axiosWithoutAccessToken.get("nft/get-nft", {
        params: {
          nftContract: bodyData.contract_address,
          tokenId: bodyData.token_id,
        }
      })
        console.log(res);
        
      return res?.data?.data as IStagingNft;
    },
  });
};
