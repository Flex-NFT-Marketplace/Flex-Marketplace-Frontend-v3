import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCollectibles = () => {  
    return useInfiniteQuery({
      queryKey: ["GET_COLLECTIBLE_DROPES"],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 50,
        }

        // if(creator) {
        //   params.creator = creator;
        // }
        const { data } = await axiosHausNoToken.post("collectible/get-collectible-dropes", params)
        return data;
      },
      // enabled: !!creator,
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetCollectibles;