import axios from "axios";
import { ICollection } from "./../../../types/ICollection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IStagingCollection } from "@/types/IStagingCollection";

export const useGetCollectionDetail = () => {
  // return useMutation({
  //   mutationKey: ["collection"],
  //   mutationFn: async (contract_address: string) => {
  //     const { data } = await axios.get(
  //       process.env.NEXT_PUBLIC_API_HOST + "collections/" + contract_address,
  //     );

  //     return data.data as ICollection;
  //   },
  // });

  return useMutation({
    mutationKey: ["collection"],
    mutationFn: async (contractAddress: string) => {
      const { data } = await axiosWithoutAccessToken.get(`/nft-collection/${contractAddress}`);

      return data.data as IStagingCollection;
    }
  })

};
