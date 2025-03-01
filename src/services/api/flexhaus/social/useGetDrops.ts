import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetDrops = (body: { size?: number, filterBy?: "upcoming" | "ongoing" | "distributed", creator?: string }) => {  
    return useInfiniteQuery({
      queryKey: ["GET_DROPS", body.size, body.filterBy, body.creator],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: body.size || 50,
        }
        if(body.filterBy) {
          params.filterBy = body.filterBy
        }

        if( body.creator) { 
          params.creator = body.creator
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
  
  export default useGetDrops;  