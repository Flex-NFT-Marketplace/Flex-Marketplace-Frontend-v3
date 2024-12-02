import axios from "axios";
import { ICollection } from "../../types/ICollection";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
const useGetSearch = (value: string) => {
  // return useQuery({
  //   queryKey: ["SEARCH", value],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       process.env.NEXT_PUBLIC_API_HOST + "search/",
  //       {
  //         params: {
  //           value: value,
  //         },
  //       },
  //     );
  //     console.log(data.data);
      
  //     return data.data;
  //   },
  // });

  return useQuery({
    queryKey: ["SEARCH", value],
    queryFn: async () => {
      const { data } = await axiosWithoutAccessToken.post("search", {
        "page": 1,
        "size": 10,
        "desc": "desc",
        "search": value,
      })
      

      return data.data
    }
  })

};

export default useGetSearch;
