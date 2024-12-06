import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import {
  PriceSortType,
  SortStatusType,
} from "@/services/providers/CollectionDetailProvider";
import { IAttributesCollection } from "@/types/INft";
import { useInfiniteQuery, } from "@tanstack/react-query";
export const useGetNFTCollection = (
  contract_address: string,
  sortPriceType: PriceSortType,
  status: SortStatusType,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
  attributes?: IAttributesCollection[],
) => {
  return useInfiniteQuery({
    queryKey: ["NFT_COLLECTION", contract_address, sortPriceType, status, attributes],

    queryFn: async ({ pageParam }) => {
      let params = {
        page: pageParam,
        size: 20,
        nftContract: contract_address,
        sortPrice: sortPriceType,
        status: status,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search,
      }

      if(attributes && attributes?.length > 0) {
        let newParams = {
          ...params,
          attributes: attributes,
        }
        params = newParams;
      }

      const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
            ...params
      })
      return data.data;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, page) => {  
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
};
