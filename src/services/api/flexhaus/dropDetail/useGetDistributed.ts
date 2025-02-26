import { axiosHausNoToken, axiosHausWithToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDistributed = () => {  
    return useInfiniteQuery({
      queryKey: ["GET_DISTRIBUTED"],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 50,
        }
        const { data } = await axiosHausWithToken.post("collectible/get-distribution-collectibles", params)
        return data;
      },
      // enabled: !!creator,
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetDistributed;  