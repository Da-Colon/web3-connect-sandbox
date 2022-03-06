
/**
 * this allows for customization of the web-connect package
 * @package web-connect
 * @note supported ids must match lengh of fallback RPC
 * @note default fallback network will be first network in object
 * @todo update to handle multiple fallback in points
 */
export const web3Config = {
  supportedNetworkIds: "1,4",
  fallbackRPCEndpoints: {
    "1": `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    "4": `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
  },
  walletConnectRPCEndpoints: {
    "1": `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    "4": `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
  },
}