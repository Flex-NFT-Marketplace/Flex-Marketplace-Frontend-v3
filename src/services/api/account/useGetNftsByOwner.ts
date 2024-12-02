import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useMutation } from "@tanstack/react-query";

export interface INftAccountResponse {
  nft: INft;
  collection: ICollection;
  orderData: {
    bestAsk: ISignature;
    listAsk: ISignature[];
  };
}

const useGetNftsByOwner = (address: string) => {
  return useMutation({
    mutationKey: ["GET_NFT_BY_ADDRESS", address],
    mutationFn: async (address: string) => {
      if (!address) return [] as IStagingNftResponse[];
      const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
        page: 1,
        size: 20,
        owner: address,
      })
      
      return data.data.items as IStagingNftResponse[];
    },
    retry: 1,
  });
};

export default useGetNftsByOwner;
