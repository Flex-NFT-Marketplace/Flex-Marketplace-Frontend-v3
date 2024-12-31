import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { IStagingCollection } from "@/types/IStagingCollection";
import { useQuery } from "@tanstack/react-query";

const useGetBannerCollections = () => {

  return useQuery({
    queryKey: ["banner_collections"],
    queryFn: async () => {
      
      const { data } = await axiosWithoutAccessToken.get(`system-setting/bannerCollection`)
      
      return data.data.nftCollectionBanner as IStagingCollection[];
    },
    retry: 1,
  });
};

export default useGetBannerCollections;
