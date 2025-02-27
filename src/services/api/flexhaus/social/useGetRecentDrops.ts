import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetRecentDrops = () => {  
    return useInfiniteQuery({
      queryKey: ["GET_RECENT_DROPS"],
      queryFn:  async ({ pageParam }) => {
      
        const params: any = {
          page: pageParam,
          size: 3,
          orderBy: "createdAt",
          desc: "desc"
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
  
  export default useGetRecentDrops;  