import {
  PriceSortType,
  SortStatusType,
} from "@/services/providers/CollectionDetailProvider";
import { INft } from "@/types/INft";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
export const useGetNFTCollection = (
  contract_address: string,
  sortPriceType: PriceSortType,
  status: SortStatusType,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
) => {
  return useInfiniteQuery({
    queryKey: ["NFT_COLLECTION", contract_address, sortPriceType, status],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "nfts/" + contract_address,
        {
          params: {
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
