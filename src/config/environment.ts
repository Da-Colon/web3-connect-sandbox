enum Environment {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Test = 'test'
}

function choose(configObj: any) {
  return configObj[process.env.NODE_ENV];
}

export const environmentalConfigs = {
  providerApiKeys: {
    infura: choose({
      [Environment.Test]: '',
      [Environment.Development]: '',
      [Environment.Staging]: '',
      [Environment.Production]: '',
    }),
    etherscan: choose({
      [Environment.Test]: '',
      [Environment.Development]: '',
      [Environment.Staging]: '',
      [Environment.Production]: '',
    }),
    alchemy: choose({
      [Environment.Test]: '',
      [Environment.Development]: '',
      [Environment.Staging]: '',
      [Environment.Production]: '',
    })
  }
};

export default environmentalConfigs