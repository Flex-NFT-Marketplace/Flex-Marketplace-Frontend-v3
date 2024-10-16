import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { Contract, RpcProvider, uint256 } from "starknet";
import { addresses } from "./address";
import { erc20Abi } from "@/constants/erc20";

// different
export enum CONTRACT_ADDRESS {
  STRK = "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D",
  ETH = "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
}

export function formatBalance(qty: bigint, decimals: number) {
  const balance = String("0").repeat(decimals) + qty.toString();
  const rightCleaned = balance.slice(-decimals).replace(/(\d)0+$/gm, "$1");
  const leftCleaned = BigInt(
    balance.slice(0, balance.length - decimals),
  ).toString();
  return leftCleaned + "." + rightCleaned;
}

const useBalanceAccount = () => {
  const { address, status, account } = useAccount();
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const [balanceETH, setBalanceETH] = useState<number>(0);
  const [balanceUSDC, setBalanceUSDC] = useState<number>(0);
  const [balanceUSDT, setBalanceUSDT] = useState<number>(0);

  useEffect(() => {
    const func = async () => {
      const addrETH =
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
      const contractBalance = new Contract(erc20Abi, addrETH, provider);

      const initialValue = await contractBalance.balanceOf(address);
      const formatBalanceData = parseFloat(formatBalance(initialValue, 18));

      // // const addrUSDC =
      // //   "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
      // // const addrUSDT =
      // //   "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8";

      // const erc20 = new Contract(erc20Abi, addrETH, provider);

      // if (account) {
      //   erc20.connect(account);
      //   const balanceInitial = await erc20.balanceOf(address);

      //   const balanceWallet = uint256
      //     .uint256ToBN(balanceInitial.balance)
      //     .toString();

      //        // console.log

      //   // setBalanceETH(convertWeiToEther(balanceWallet));
      // }

      // // const erc21 = new Contract(abi, addrUSDC, provider);
      // // if (account) {
      // //   erc20.connect(account);

      // //   const balanceInitial = await erc21.balanceOf(account.address);
      // //   const balanceWallet = uint256
      // //     .uint256ToBN(balanceInitial.balance)
      // //     .toString();

      // //        // console.log

      // //   // setBalanceUSDC(convertWeiToEther(balanceWallet));
      // // }

      // // const erc22 = new Contract(abi, addrUSDT, provider);
      // // if (account) {
      // //   erc20.connect(account);
      // //   const balanceInitial = await erc22.balanceOf(account.address);
      // //   const balanceWallet = uint256
      // //     .uint256ToBN(balanceInitial.balance)
      // //     .toString();

      // //        // console.log

      // //   // setBalanceUSDT(convertWeiToEther(balanceWallet));
      // // }
    };

    func();
  }, [account]);

  return {};
};

export default useBalanceAccount;
