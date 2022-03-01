import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import config from "../../config";
// import { PortisConnector } from '@web3-react/portis-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


// @todo hardware wallets need polling param
// const POLLING_INTERVAL = 12000
export enum ConnectorNames {
  Injected = 'Metamask',
  WalletConnect = 'WalletConnect',
  Fallback = 'Fallback',
}
/**
 * 
 * @returns parsed supported chain ids from .env
 */
export const supportedChainIds = () => {
  const dev =
    process.env.NODE_ENV !== "production" ? [parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID || "0", 10)] : [];
  const supported = [
    ...dev,
    ...(process.env.REACT_APP_SUPPORTED_CHAIN_IDS || "").split(",").map((i) => parseInt(i, 10)),
  ];
  return supported;
};

export const getConnectorName = (connector: any) => {
  switch(connector) {
    case connectors.fallback: {
      return ConnectorNames.Fallback
    }
    case connectors.injected: {
      return ConnectorNames.Injected
    }
    case connectors.injected: {
      return ConnectorNames.WalletConnect
    }
    default:
      return 'Unknown'
  }
}

/**
 * object containing connect class instances
 * @todo add local RPC Connector
 */
const connectors: {[connector: string]: any} = {
  injected: new InjectedConnector({ supportedChainIds: supportedChainIds() }),
  fallback: new NetworkConnector({
    urls: config.fallbackRPCs.infura,
    defaultChainId: parseInt(process.env.REACT_APP_FALLBACK_CHAIN_ID || "1", 10)
  }),
  walletconnect: new WalletConnectConnector({
    rpc: config.fallbackRPCs.infura,
    chainId: 1,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })
};
export const connectorsByName: any = {
  [ConnectorNames.Injected]: connectors.injected,
  [ConnectorNames.WalletConnect]: connectors.walletconnect,
  [ConnectorNames.Fallback]: connectors.fallback
}

export default connectors