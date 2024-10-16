import { ICollection } from "@/types/ICollection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCollections = (page: number) => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "collections",
        {
          params: {
            page: 1,
            limit: 10,
          },
        },
      );

      return data.data as ICollection[];
    },
    retry: 1,
  });
};

export default useGetCollections;
