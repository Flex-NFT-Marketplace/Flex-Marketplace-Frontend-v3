"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Contract, RpcProvider } from "starknet";
import { abiTestnet } from "./abi";
import { useNotify } from "@/services/providers/NotifyProvider";
import { useAccount, useWaitForTransaction } from "@starknet-react/core";
import { convertEtherToWei } from "@/utils/string";

export type AtemuContextProps = {
  isMint: boolean;
  supply: number;
  isLoading: boolean;
  isLoadingChecker: boolean;
  onCheckWallet: (phase: number) => Promise<any>;
  onMintGTD: () => Promise<any>;
  onMintWhited: () => Promise<any>;
  onMintPublic: () => Promise<any>;
};

export const AtemuContext = createContext<AtemuContextProps | undefined>(
  undefined,
);

export const AtemuMintProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { status, account, address } = useAccount();
  const [isMint, setIsMint] = useState(false);
  const [supply, setSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChecker, setIsLoadingChecker] = useState(false);
  const { onShowNotify } = useNotify();
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const onCheckWallet = async (phase: number) => {
    console.log("Phase", phase);
    if (phase == 3) {
      setIsMint(true);
      setIsLoadingChecker(false);
      return;
    }
    if (status) {
      try {
        setIsLoadingChecker(true);

        const contract = new Contract(
          abiTestnet,
          process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
          provider,
        );

        const isWalletWhitelisted =
          await contract.is_wallet_whitelisted(address);
        const isWalletGTD = await contract.is_wallet_gtd(address);

        const isWalletGTDMinted = await contract.is_wallet_gtd_minted(address);
        const isWalletPublicMinted =
          await contract.is_wallet_public_minted(address);
        const isWalletWhitedMinted =
          await contract.is_wallet_whitelisted_minted(address);

        if (isWalletGTD || isWalletWhitelisted) {
          if (
            isWalletWhitedMinted ||
            isWalletGTDMinted ||
            isWalletPublicMinted
          ) {
            onShowNotify("You are ineligible, please change to another wallet");
            setIsMint(false);
          } else {
            onShowNotify("Welcome on board, you are eligible for the minting");
            setIsMint(true);
          }
        } else {
          onShowNotify("You are ineligible, please change to another wallet");
          setIsMint(false);
        }
        setIsLoadingChecker(false);
      } catch (error) {
        setIsLoadingChecker(false);
        onShowNotify("Please connect wallet.");
      }
    } else {
      setIsLoadingChecker(false);
      onShowNotify("Please connect wallet.");
    }
  };

  const onMintGTD = async () => {
    try {
      if (status) {
        const res = await account?.execute([
          {
            contractAddress: process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
            entrypoint: "mint_gtd",
            calldata: [],
          },
        ]);
        setIsLoading(true);

        await provider.waitForTransaction(res?.transaction_hash as string);
        setIsLoading(false);

        onShowNotify("Mint success");
      } else {
        onShowNotify("Please connect wallet.");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onMintWhited = async () => {
    try {
      if (status) {
        const res = await account?.execute([
          {
            contractAddress: process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
            entrypoint: "mint_whitelisted",
            calldata: [],
          },
        ]);
        setIsLoading(true);
        await provider.waitForTransaction(res?.transaction_hash as string);
        setIsLoading(false);
        onShowNotify("Mint success");
      } else {
        setIsLoading(false);
        onShowNotify("Please connect wallet.");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onMintPublic = async () => {
    try {
      if (status) {
        const res = await account?.execute([
          {
            contractAddress: process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
            entrypoint: "mint_public",
            calldata: [],
          },
        ]);

        setIsLoading(true);
        await provider.waitForTransaction(res?.transaction_hash as string);
        setIsLoading(false);

        onShowNotify("Mint success");
      } else {
        setIsLoading(false);
        onShowNotify("Please connect wallet.");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onCurrentSupply = async () => {
    const contract = new Contract(
      abiTestnet,
      process.env.NEXT_PUBLIC_ATEMU_CONTRACT as string,
      provider,
    );

    const supply = await contract.get_current_token_supply();
    setSupply(Number(supply) + 1);
  };

  useEffect(() => {
    onCurrentSupply();
  }, []);

  const value = {
    isMint,
    isLoading,
    supply,
    onCheckWallet,
    onMintGTD,
    onMintPublic,
    onMintWhited,
    isLoadingChecker,
  };

  return (
    <AtemuContext.Provider value={value}>{children}</AtemuContext.Provider>
  );
};

export const useAtemuContext = () => {
  const context = useContext(AtemuContext);
  if (!context) {
    throw new Error("useAtemuContext must be used within a AtemuMintProvider");
  }
  return context;
};
