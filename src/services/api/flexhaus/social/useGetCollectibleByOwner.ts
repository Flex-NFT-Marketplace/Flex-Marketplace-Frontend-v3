import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetCollectibleByOwner = (creator: string) => {  
    return useInfiniteQuery({
      queryKey: ["GET_COLLECTIBLE_BY_OWNER", creator],
      queryFn:  async ({ pageParam }) => {
        const { data } = await axiosHausNoToken.post("collectible/get-collectible-dropes", {
          page: pageParam,
          size: 50,
          creator: creator
        })
        return data;
      },
      enabled: !!creator,
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetCollectibleByOwner;