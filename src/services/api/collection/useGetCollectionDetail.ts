import axios from "axios";
import { ICollection } from "./../../../types/ICollection";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCollectionDetail = () => {
  return useMutation({
    mutationKey: ["collection"],
    mutationFn: async (contract_address: string) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "collections/" + contract_address,
      );

      return data.data as ICollection;
    },
  });
};
