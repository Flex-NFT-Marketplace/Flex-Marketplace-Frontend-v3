import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetSets = (creator?: string) => {  
    return useInfiniteQuery({
      queryKey: ["GET_DROPS", creator],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 50,
        }

        if(creator) {
          params.creator = creator
        }

        const { data } = await axiosHausNoToken.post("flexhaus-drop/get-sets", params)
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetSets;