import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from '@web3-react/network-connector'
import config from "../../config";
// import { PortisConnector } from '@web3-react/portis-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


// @todo hardware wallets need polling param
// const POLLING_INTERVAL = 12000
export enum ConnectorNames {
  Injected = 'Metamask',
  Fallback = 'Mainnet',
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

/**
 * object containing connect class instances
 * @todo add local RPC Connector
 */
export const connectors: any = {
  injected: new InjectedConnector({ supportedChainIds: supportedChainIds() }),
  fallback: new NetworkConnector({
    urls: config.fallbackRPCs.infura,
    defaultChainId: parseInt(process.env.REACT_APP_FALLBACK_CHAIN_ID || "1", 10)
  })
};

export const connectorsByName: any = {
  [ConnectorNames.Injected]: connectors.injected,
  [ConnectorNames.Fallback]: connectors.fallback
}

export default connectors