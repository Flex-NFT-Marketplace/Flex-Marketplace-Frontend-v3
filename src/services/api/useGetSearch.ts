import { useQuery } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
const useGetSearch = (value: string) => {

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
