import React from "react";
import axios from "axios";
import { ICollection } from "../../types/ICollection";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { IStaking } from "@/types/IStaking";

const useGetStakingList = (address: string) => {
  return useQuery({
    queryKey: ["STAKING", address],
    queryFn: async () => {
      if (address == "") {
        return [] as IStaking[];
      }

      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_HOST + "staking/" + address,
      );

      return data.data as IStaking[];
    },
  });
};

export default useGetStakingList;
