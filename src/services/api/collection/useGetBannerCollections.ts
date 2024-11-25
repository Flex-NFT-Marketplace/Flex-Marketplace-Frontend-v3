import { ICollection } from "@/types/ICollection";
import { convertStagingCollectionTypeToICollectionType } from "@/utils/string";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetBannerCollections = () => {
  const listCollectionsToShow = 
  [
    "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478", // Everai
    "0x0241b9c4ce12c06f49fee2ec7c16337386fa5185168f538a7631aacecdf3df74", // Influence CrewMate
    "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd", // Dreamy BoTTy
    "0x04fa864a706e3403fd17ac8df307f22eafa21b778b73353abf69a622e47a2003"  // Ducks Everywhere
  ]

  return useQuery({
    queryKey: ["banner_collections"],
    queryFn: async () => {
      const responses = await Promise.all(
        listCollectionsToShow.map((nftContract) =>
          axios.get(
            `${process.env.NEXT_PUBLIC_API_STAGING}nft-collection/${nftContract}`,
          )
        )
      );
      const data = responses.map((response) => convertStagingCollectionTypeToICollectionType(response?.data?.data?.data));
      
      return data;
    },
    retry: 1,
  });
};

export default useGetBannerCollections;
