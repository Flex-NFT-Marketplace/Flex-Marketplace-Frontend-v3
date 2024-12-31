import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig"
import { IStagingNftResponse } from "@/types/IStagingNft";

export const getNftsAbleToStake = async (ownerAddress: string, nftContract: string) => {

    const { data } = await axiosWithoutAccessToken.post("nft/get-nfts", {
        page: 1,
        size: 50,
        owner: ownerAddress,
        nftContract: nftContract
    })

    return data.data.items as IStagingNftResponse[];
}