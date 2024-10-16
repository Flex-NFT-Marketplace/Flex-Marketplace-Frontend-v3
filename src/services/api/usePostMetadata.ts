import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const usePostMetadata = () => {
  return useMutation({
    mutationKey: ["POST_METADATA"],
    mutationFn: async (formData: any) => {
      try {
        const { data } = await axios.post(
          process.env.NEXT_PUBLIC_API_HOST_METADATA + "metadata/single/",
          formData,
        );

        return data;
      } catch (error) {}
    },
  });
};

export default usePostMetadata;
