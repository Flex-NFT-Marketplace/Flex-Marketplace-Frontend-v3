import { ICollection } from "@/types/ICollection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "collections",
      );

      return data.data as { banner: ICollection[]; trending: ICollection[] };
    },
    retry: 1,
  });
};

export default useGetCollections;
