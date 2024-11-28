import { ICollection } from "@/types/ICollection";
import { IStagingCollection } from "@/types/IStagingCollection";
import { convertStagingCollectionTypeToICollectionType } from "@/utils/convertType";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetBannerCollections = () => {

  return useQuery({
    queryKey: ["banner_collections"],
    queryFn: async () => {
      
      const responses = await axios.get(`${process.env.NEXT_PUBLIC_API_STAGING}system-setting/bannerCollection`)
        
      const {nftCollectionBanner} = responses.data?.data;
      
      const dataConverted = nftCollectionBanner.map((item: IStagingCollection) => convertStagingCollectionTypeToICollectionType(item))
      
      return dataConverted as ICollection[];
    },
    retry: 1,
  });
};

export default useGetBannerCollections;
