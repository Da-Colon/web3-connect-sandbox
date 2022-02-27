import { InjectedConnector } from "@web3-react/injected-connector";
// import { AuthereumConnector } from '@web3-react/authereum-connector'
// import { FortmaticConnector } from '@web3-react/fortmatic-connector'
// import { FrameConnector } from '@web3-react/frame-connector'
// import { LatticeConnector } from '@web3-react/lattice-connector'
// import { LedgerConnector } from '@web3-react/ledger-connector'
// import { MagicConnector } from '@web3-react/magic-connector'
// import { NetworkConnector } from '@web3-react/network-connector'
// import { PortisConnector } from '@web3-react/portis-connector'
// import { TorusConnector } from '@web3-react/torus-connector'
// import { TrezorConnector } from '@web3-react/trezor-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'

// @todo hardware wallets need polling param
// const POLLING_INTERVAL = 12000

// @todo possible place this in environemnt configs or retrieve from
// const RPC_URLS: { [chainId: number]: string } = {
//   1: process.env.RPC_URL_1 as string,
//   4: process.env.RPC_URL_4 as string
// }

/**
 * 
 * @returns parsed supported chain ids from .env
 */
const supportedChainIds = () => {
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
 */
export const connectors = {
  injected: new InjectedConnector({ supportedChainIds: supportedChainIds() }),
};

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

export const connectorsByName: any = {
  [ConnectorNames.Injected]: connectors.injected,
  [ConnectorNames.WalletConnect]: null
}

export default connectors
