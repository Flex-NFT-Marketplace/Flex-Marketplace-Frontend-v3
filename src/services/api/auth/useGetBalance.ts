import { useMutation } from "@tanstack/react-query";

export const useGetBalance = () => {
  return useMutation({
    mutationKey: ["GET_BALANCE"],
    mutationFn: async (address?: string) => {
      const url =
        "https://eth-mainnet.g.alchemy.com/v2/PDWMhHtyi3_RVgU1VbNwTfZ9MscJffDZ";
        
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenMetadata",
        params: [
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        ],
      });

      fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          return data.result;
        })
        .catch((error) => console.error("Error:", error));
    },
  });
};
