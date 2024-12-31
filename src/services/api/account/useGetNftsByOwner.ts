import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export interface INftAccountResponse {
  nft: INft;
  collection: ICollection;
  orderData: {
    bestAsk: ISignature;
    listAsk: ISignature[];
  };
}

const useGetNftsByOwner = (address: string) => {  
  return useInfiniteQuery({
    queryKey: ["GET_NFTS", address],
    queryFn:  async ({ pageParam }) => {
      const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
        page: pageParam,
        size: 50,
        owner: address
      })
      return data;
    },
    enabled: !!address,
    initialPageParam: 1,
    getNextPageParam: (lastPage, page) => {
      return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
    },
  })
};

export default useGetNftsByOwner;
