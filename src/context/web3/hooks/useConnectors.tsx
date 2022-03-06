import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect } from "react";
import { Web3Config } from "../types/index.d";
import { ConnectorNames } from "../types/index.d";

const useConnectors = (config?: Web3Config) => {
  useEffect(() => {
    if (!config) {
      throw "Missing Config File";
    }
  });
  const supportedChainIds = config ? config.supportedNetworkIds.split(",").map((i) => parseInt(i, 10)) : [1];

  const getConnectorName = (connector: any) => {
    switch (connector) {
      case connectors.fallback: {
        return ConnectorNames.Fallback;
      }
      case connectors.injected: {
        return ConnectorNames.Injected;
      }
      case connectors.injected: {
        return ConnectorNames.WalletConnect;
      }
      default:
        return "Unknown";
    }
  };

  const connectors: { [connector: string]: any } = {
    injected: new InjectedConnector({ supportedChainIds: supportedChainIds }),

    fallback: new NetworkConnector({
      urls: config!.fallbackRPCEndpoints,
      defaultChainId: parseInt(process.env.REACT_APP_FALLBACK_CHAIN_ID || "1", 10),
    }),

    walletconnect: new WalletConnectConnector({
      rpc: config!.walletConnectRPCEndpoints,
      chainId: 1,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    }),
  };

  const connectorsByName: any = {
    [ConnectorNames.Injected]: connectors.injected,
    [ConnectorNames.WalletConnect]: connectors.walletconnect,
    [ConnectorNames.Fallback]: connectors.fallback,
  };

  return {
    connectors,
    connectorsByName,
    getConnectorName,
  };
};

export default useConnectors;
