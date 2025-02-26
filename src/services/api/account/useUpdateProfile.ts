
import { axiosWithAccessToken } from "@/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query"

const updateProfile = () => {
    return useMutation({
        mutationKey: ["UPDATE_PROFILE"],
        mutationFn: async (bodyData: {
            username?: string,
            email?: string;
            avatar: string,
            cover?: string,
            about: string,
            social: { twitter?: string, telegram?: string, discord?: string, website?: string, warpcast?: string }
        }) => {
            const { data } = await axiosWithAccessToken.post("user/update-profile", {
                bodyData
            })

            return data;
            
        }
    })
} 

export default updateProfile;