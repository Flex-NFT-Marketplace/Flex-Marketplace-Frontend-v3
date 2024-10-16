import {
  PriceSortType,
  SortStatusType,
} from "./../providers/CollectionDetailProvider";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "signatures/activity/",
        {
          params: {
            contract_address: contract_address,
            page: pageParam,
            sortPrice: sortPriceType,
            status: status,
            minPrice: minPrice,
            maxPrice: maxPrice,
            search: search,
          },
        },
      );

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, page) => {
      return lastPage.nextPage ? lastPage.nextPage : undefined;
    },
  });
};
