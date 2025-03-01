import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetUnSecuredCollectible = (user?: string) => {  
    return useInfiniteQuery({
      queryKey: ["GET_UN_SECURED_COLLECTIBLE_DROPES", user],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 50,
        }

        if(user) {
          params.user = user;
        }
        const { data } = await axiosHausNoToken.post("collectible/get-distribution-collectibles", params)
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetUnSecuredCollectible;  