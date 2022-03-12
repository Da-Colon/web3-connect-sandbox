enum Environment {
  Production = "production",
  Staging = "staging",
  Development = "development",
  Test = "test",
}

function choose(configObj: any) {
  return configObj[process.env.NODE_ENV];
}

const INFURA_RPCS = {
  1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
  4: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
};

export const environmentalConfigs = {
  fallbackRPCs: {
    infura: choose({
      [Environment.Test]: INFURA_RPCS,
      [Environment.Development]: INFURA_RPCS,
      [Environment.Staging]: INFURA_RPCS,
      [Environment.Production]: INFURA_RPCS,
    }),
  },
};

export default environmentalConfigs;
