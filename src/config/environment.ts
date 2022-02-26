const config = {
  connection: {
    walletconnectId: process.env.REACT_APP_WALLET_CONNECT_INFURA_ID,
    local: {
      url: process.env.REACT_APP_LOCAL_PROVIDER_URL,
      developmentDelay: process.env.REACT_APP_DEVELOPMENT_TX_WAIT_MS,
    },
    fallbackChainId: process.env.REACT_APP_FALLBACK_CHAIN_ID,
    supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS,
    contractAddresses: process.env.REACT_APP_CONTRACT_ADDRESSES,
    providerKeys: {
      infuraId: process.env.REACT_APP_INFURA_API_KEY,
      alchemyId: process.env.REACT_APP_ALCHEMY_API_KEY,
      etherscanId: process.env.REACT_APP_ETHERSCAN_API_KEY,
    },
  },
};

export default config