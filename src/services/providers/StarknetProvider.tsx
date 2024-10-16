"use client";
import React from "react";

import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  alchemyProvider,
  jsonRpcProvider,
} from "@starknet-react/core";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { ArgentMobileConnector } from "starknetkit/argentMobile";

function rpc(chain: Chain) {
  return {
    nodeUrl: `http://75.101.225.172:6060/`,
  };
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connectors = [
    new InjectedConnector({ options: {id: "braavos", name: "Braavos" }}),
    new InjectedConnector({ options: {id: "argentX", name: "Argent X" }}),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ]

  const provider = alchemyProvider({
    apiKey: "PDWMhHtyi3_RVgU1VbNwTfZ9MscJffDZ",
  });

  // const provider = jsonRpcProvider({ rpc });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
