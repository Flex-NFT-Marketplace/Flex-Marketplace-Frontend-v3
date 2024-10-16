import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetActivity = () => {
  return useMutation({
    mutationKey: ["getActivity"],
    mutationFn: async (body: { contractAddress: string; tokenId: string }) => {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_STAGING + `histories`,
        {
          nftContract: body.contractAddress,
          tokenId: body.tokenId,
          orderBy: "updatedAt",
          desc: "asc",
        },
      );

      return res.data.data.items;
    },
  });
};
