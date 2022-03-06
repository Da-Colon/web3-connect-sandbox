import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Web3Provider } from "./hooks/useWeb3Provider";

/**
 * Web3Wrapper
 * @returns
 */
const Web3Wrapper = ({ children }: { children: JSX.Element }) => {
  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider>{children}</Web3Provider>
    </Web3ReactProvider>
  );
};

export default Web3Wrapper;
