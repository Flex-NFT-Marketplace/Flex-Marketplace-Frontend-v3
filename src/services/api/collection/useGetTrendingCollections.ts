import { ICollection } from "@/types/ICollection";
import { convertStagingCollectionTypeToICollectionType } from "@/utils/string";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IStagingCollection } from "@/types/IStagingCollection";

const useGetBannerCollections = () => {

  return useQuery({
    queryKey: ["trending_collections"],
    queryFn: async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_STAGING}nft-collection/get-collections`,
            {
                "page": 1,
                "size": 10,
                "status": "active"
            }
          )
          const { items } = response?.data?.data;
          const itemsConverted = items.map((item: IStagingCollection) => convertStagingCollectionTypeToICollectionType(item));
          
        return itemsConverted as ICollection[];
    },
    retry: 1,
  });
};

export default useGetBannerCollections;
