import axios from "axios";
import { ICollection } from "../../types/ICollection";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
const useGetSearch = (value: string) => {
  return useQuery({
    queryKey: ["SEARCH", value],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "search/",
        {
          params: {
            value: value,
          },
        },
      );

      return data.data;
    },
  });
};

export default useGetSearch;
