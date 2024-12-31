import axios from "axios";
import { ICollection } from "./../../../types/ICollection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollectionEconomic, IStagingCollection } from "@/types/IStagingCollection";

export const useGetCollectionEconomic = () => {

  return useMutation({
    mutationKey: ["collection_economic"],
    mutationFn: async (contractAddress: string) => {
      const { data } = await axiosWithoutAccessToken.post(`/nft-collection/economic`, {
        page: 1,
        size: 10,
        nftContract: contractAddress
      });

      return data.data.items[0] as ICollectionEconomic;
    }
  })

};
