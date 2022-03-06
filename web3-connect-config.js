
/**
 * this allows for customization of the web-connect package
 * @package web-connect
 * @note supported ids must match lengh of fallback RPC
 * @todo update to handle multiple fallback in points
 */
module.exports = {
  suppoertedNetworkIds: "1,4",
  fallbacRPCEndpoints: {
    "1": `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
    "4": `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
  },
}