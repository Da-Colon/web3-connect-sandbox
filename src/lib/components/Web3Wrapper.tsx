import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { FC } from "react";
import { Web3Provider } from "../hooks/useWeb3Provider";
import { Web3Config } from "../types";

interface Web3WrapperProps {
  config: Web3Config;
  children: JSX.Element;
}
/**
 * Web3Wrapper
 * @returns
 */

const Web3Wrapper: FC<Web3WrapperProps> = ({ config, children }) => {
  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider config={config}>{children}</Web3Provider>
    </Web3ReactProvider>
  );
};

export default Web3Wrapper;
