import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITrendingCollection } from "@/types/ITrendingCollection";

const useGetBannerCollections = () => {

  return useQuery({
    queryKey: ["trending_collections"],
    queryFn: async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_STAGING}nft-collection/tredingNftCollection`,
            {
                "page": 1,
                "size": 10,
                "desc": "desc"
            }
          )
          const { items } = response?.data?.data;
            
        return items as ITrendingCollection[];
    },
    retry: 1,
  });
};

export default useGetBannerCollections;
