import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";

export const useGetActivity = () => {
  return useMutation({
    mutationKey: ["getActivity"],
    mutationFn: async (body: { contractAddress: string; tokenId: string }) => {
      const res = await axiosWithoutAccessToken.post("histories", {
        page: 1,
        size: 10,
        desc: "desc",
        tokenId: body.tokenId,
        nftContract: body.contractAddress,
      })

      return res.data.data.items;
    },
  });
};
