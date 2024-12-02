import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import {
  PriceSortType,
} from "./../providers/CollectionDetailProvider";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { SortStatusType } from "../providers/ActivityProvider";

export const useGetNFTActivity = (
  contract_address: string,
  sortPriceType?: PriceSortType,
  status?: SortStatusType,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
) => {
  return useInfiniteQuery({
    queryKey: ["NFT_ACTIVITY", sortPriceType, status, contract_address, search, minPrice, maxPrice],
    queryFn: async ({ pageParam }) => {
      let params = {
        page: pageParam,
        size: 50,
        sortPrice: sortPriceType,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search,
      }
      if (contract_address) {
        const newParams = {
          contract_address: contract_address,
          ...params
        }
        params = newParams
      }

      if (status) {
        const newParams = {
          status: status,
          ...params
        }
        params = newParams
      }
      
      const { data } = await axiosWithoutAccessToken.get("signatures/activity/",
        {
          params: params
        },
      );
      
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, page) => {
      return lastPage.data.hasNext ? lastPage.data.page + 1 : undefined;
    },
  });
};
