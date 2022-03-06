import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect, useState } from "react";
import { Web3Config } from "../types/index.d";
import { useWeb3React } from "@web3-react/core";
import metamaskLogo from "../assets/images/metamask-logo.svg";
import walletconnectLogo from "../assets/images/walletconnect-logo.svg";
export enum ConnectorNames {
  Injected = "Metamask",
  WalletConnect = "WalletConnect",
  Fallback = "Fallback",
}

export interface Connector {
  name: string;
  connector: any;
  logo: string;
}

const useConnectors = (config?: Web3Config) => {
  const { activate, connector } = useWeb3React();
  const [selectedConnector, setSelectedConnector] = useState<Connector>();

  // connector currently activating
  const [activatingConnector, setActivatingConnector] = useState<Connector>();

  useEffect(() => {
    if (activatingConnector) {
      if (activatingConnector.connector === connector) {
        setSelectedConnector(activatingConnector);
        setActivatingConnector(undefined);
      }
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

  const getLogoByName: any = {
    [ConnectorNames.Injected]: metamaskLogo,
    [ConnectorNames.WalletConnect]: walletconnectLogo,
    [ConnectorNames.Fallback]: "", // no logo
  };

  const connectorsByName: { [key: string]: Connector } = {
    [ConnectorNames.Injected]: {
      connector: connectors.injected,
      name: ConnectorNames.Injected,
      logo: getLogoByName[ConnectorNames.Injected],
    },
    [ConnectorNames.WalletConnect]: {
      connector: connectors.walletconnect,
      name: ConnectorNames.WalletConnect,
      logo: getLogoByName[ConnectorNames.WalletConnect],
    },
    [ConnectorNames.Fallback]: {
      connector: connectors.fallback,
      name: ConnectorNames.Fallback,
      logo: getLogoByName[ConnectorNames.Fallback],
    },
  };

  const activateConnector = async (_connectorName: string) => {
    const connection = connectorsByName[_connectorName];
    setActivatingConnector(connection);
    activate(
      connection.connector,
      (error: any) => {
        if (error) {
          setActivatingConnector(undefined);
        }
      },
      true
    );
  };

  return {
    connectors,
    connectorsByName,
    activatingConnector,
    selectedConnector,
    getLogoByName,
    setActivatingConnector,
    activateConnector,
  };
};

export default useConnectors;
