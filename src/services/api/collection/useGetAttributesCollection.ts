import { axiosWithoutAccessToken } from "@/axiosConfig/axiosConfig"
import { IAttributesCollectionFilter } from "@/types/INft"
import { useMutation } from "@tanstack/react-query"

export const useGetAttributesCollection = (address: string) => {
     return useMutation({
        mutationKey: ["ARRTRIBUTES", address],
        mutationFn: async (address: string) => {
            if(!address) return [] as IAttributesCollectionFilter[];
            const { data } = await axiosWithoutAccessToken.get(`nft-collection/attributes/${address}`)
            return data.data as IAttributesCollectionFilter[];
        }
     })
}