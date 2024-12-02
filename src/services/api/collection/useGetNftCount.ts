import axios from "axios";
import { ICollection } from "./../../../types/ICollection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { ICollectionCounter, ICollectionEconomic, IStagingCollection } from "@/types/IStagingCollection";

export const useGetCollectionCount = () => {

  return useMutation({
    mutationKey: ["collection_count"],
    mutationFn: async (contractAddress: string) => {
      const {data} = await axiosWithoutAccessToken.get(`/nft-collection/total-suppply/${contractAddress}`);

      return data.data as ICollectionCounter;
    }
  })

};
