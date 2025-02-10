import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCreatorsSuggestion = () => {  
    return useInfiniteQuery({
      queryKey: ["GET_CREATORS_SUGGESTION"],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 50,
        }
        const { data } = await axiosHausNoToken.post("collectible/get-collectible-dropes", params)
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetCreatorsSuggestion;