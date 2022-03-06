import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect, useState } from "react";
import { Web3Config } from "../types/index.d";
import { ConnectorNames } from "../types/index.d";
import { useWeb3React } from "@web3-react/core";

const useConnectors = (config?: Web3Config) => {
  const { activate, connector } = useWeb3React();

  // connector currently activating
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (!config) {
      throw "Missing Config File";
    }
  });

  const supportedChainIds = config ? config.supportedNetworkIds.split(",").map((i) => parseInt(i, 10)) : [1];

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

  const connectorsByName: any = {
    [ConnectorNames.Injected]: connectors.injected,
    [ConnectorNames.WalletConnect]: connectors.walletconnect,
    [ConnectorNames.Fallback]: connectors.fallback,
  };

  const activateConnector = (_connectorName: string) => {
    setActivatingConnector(connectorsByName[_connectorName]);
    activate(connectorsByName[_connectorName], (error: any) => {
      if (error) {
        setActivatingConnector(undefined);
      }
    });
  };

  return {
    connectors,
    connectorsByName,
    activatingConnector,
    getConnectorName,
    setActivatingConnector,
    activateConnector
  };
};

export default useConnectors;
