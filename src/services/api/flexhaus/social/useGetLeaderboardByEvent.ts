import { axiosHausNoToken } from "@/axiosConfig/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetLeaderboardByEvent = (eventId: string) => {  
    return useInfiniteQuery({
      queryKey: ["GET_LEADERBOARD_BY_EVENT", eventId],
      queryFn:  async ({ pageParam }) => {
        const { data } = await axiosHausNoToken.post("flexhaus-event/leaderboard", {
          page: pageParam,
          size: 50,
          eventId: eventId
        })
        return data;
      },
      enabled: !!eventId,
      initialPageParam: 1,
      getNextPageParam: (lastPage, page) => {
        return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
      },
    })
  };
  
  export default useGetLeaderboardByEvent;