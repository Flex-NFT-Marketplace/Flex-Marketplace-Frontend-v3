import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOpenEditions = (state: string) => {
  // try {
  //     const url = process.env.NEXT_PUBLIC_API_STAGING + "open-edition/drop-phases";
  //     const { data } = await axios.post(url, {
  //         "page": 1,
  //         "size": 100,
  //         "dropPhaseType": state
  //     })
  //     return data.data;
  // } catch (error) {
  //     console.error(error);

  // }

  return useQuery({
    queryKey: ["GET_OPEN_EDITIONS", state],
    queryFn: async () => {
      const url =
        process.env.NEXT_PUBLIC_API_STAGING + "open-edition/drop-phases";
      const { data } = await axios.post(url, {
        page: 1,
        size: 100,
        dropPhaseType: state,
      });
      return data.data;
    },
  });
};
