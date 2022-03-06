export interface Web3Config {
  supportedNetworkIds: string;
  fallbackRPCEndpoints: { [value: string]: string };
  walletConnectRPCEndpoints: { [value: string]: string };
}

export enum ConnectorNames {
  Injected = 'Metamask',
  WalletConnect = 'WalletConnect',
  Fallback = 'Fallback',
}
