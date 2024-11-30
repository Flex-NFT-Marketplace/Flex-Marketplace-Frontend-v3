import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { convertStagingNftTypeToINft } from "@/utils/convertType";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface INftAccountResponse {
  nft: INft;
  collection: ICollection;
  orderData: {
    bestAsk: ISignature;
    listAsk: ISignature[];
  };
}

// const useGetNftsByOwner = (address: string) => {
//   return useMutation({
//     mutationKey: ["GET_NFT_BY_ADDRESS", address],
//     mutationFn: async (address: string) => {
//       if (!address) return [] as INftAccountResponse[];
//       const { data } = await axios.get(
//         process.env.NEXT_PUBLIC_API_HOST + "nfts/account/" + address,
//       );

//       return data.data as INftAccountResponse[];
//     },
//     retry: 1,
//   });
// };

export const useGetNftsByOwner = (address: string) => {
  let initialPageParam = 1;
  let hasNextPage = true;
  let allData: INft[] = [];
  return useMutation({
    mutationKey: ["GET_All_NFTS_BY_OWNER", address],
    mutationFn: async (address: string) => {
      if(!address) return allData;
      while (hasNextPage) {
        const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
          page: initialPageParam,
          size: 10,
          owner: address,
        })
        console.log(data.data);
        
        for (let i = 0; i < data.data.items.nft.length; i++) {
          allData.push(convertStagingNftTypeToINft(data.data.items.nft[i]));
        }
      
        data.data.hasNext ? initialPageParam++ : hasNextPage = false;
      }
      
      return allData;
    },
    retry: 1,
  })
}

export default useGetNftsByOwner;
