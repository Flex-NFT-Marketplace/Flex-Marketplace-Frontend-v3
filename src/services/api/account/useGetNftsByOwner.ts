import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      if (!address) return [] as INftAccountResponse[];
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "nfts/account/" + address,
      );

      return data.data as INftAccountResponse[];
    },
    retry: 1,
  });
};

export default useGetNftsByOwner;
