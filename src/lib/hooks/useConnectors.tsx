import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import metamaskLogo from "../assets/images/metamask-logo.svg";
import walletconnectLogo from "../assets/images/walletconnect-logo.svg";
import { Web3Config } from '../types';
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
  const supportedChainIds = config ? config.supportedNetworkIds.split(",").map((i) => parseInt(i, 10)) : [1];

  const { activate, connector, deactivate } = useWeb3React();

  const defaultConnectors = {
    [ConnectorNames.Injected]: {
      connector: new InjectedConnector({ supportedChainIds: supportedChainIds }),
      name: ConnectorNames.Injected,
      logo: metamaskLogo,
    },
    [ConnectorNames.WalletConnect]: {
      connector: new WalletConnectConnector({
        rpc: config!.walletConnectRPCEndpoints,
        chainId: 1,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
      }),
      name: ConnectorNames.WalletConnect,
      logo: walletconnectLogo,
    },
    [ConnectorNames.Fallback]: {
      connector: new NetworkConnector({
        urls: config!.fallbackRPCEndpoints,
        defaultChainId: parseInt(process.env.REACT_APP_FALLBACK_CHAIN_ID || "1", 10),
      }),
      name: ConnectorNames.Fallback,
      logo: "",
    },
  };

  const [connectors] = useState<Map<string, Connector>>(
    new Map(Object.entries(defaultConnectors))
  );
  const [activeConnector, setActiveConnector] = useState<Connector>();

  // connector currently activating
  const [activatingConnector, setActivatingConnector] = useState<Connector>();

  useEffect(() => {
    if (activatingConnector) {
      if (activatingConnector.connector === connector) {
        setActiveConnector(activatingConnector);
      }
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector, connectors]);

  useEffect(() => {
    if (!config) {
      throw new Error("Missing Config File");
    }
  });

  const activateConnector = async (_connectorName: string) => {
  console.log("🚀 ~ file: useConnectors.tsx ~ line 76 ~ _connectorName", _connectorName)
    const connection = connectors.get(_connectorName);
    if(!connection) {
      throw new Error("Connection Not Found")
    }
    await activate(
      connection?.connector,
      (error: any) => {
        if (error) {
          setActivatingConnector(undefined);
        }
      },
      true
    );
    setActivatingConnector(connection);
  };

  const deactivateConnector = () => {
    setActiveConnector(undefined)
    deactivate()
  }

  return {
    connectors,
    activatingConnector,
    activeConnector,
    activateConnector,
    deactivateConnector,
  };
};

export default useConnectors;
