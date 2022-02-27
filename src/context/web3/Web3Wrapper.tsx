import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Web3Connector } from "./Web3Connector";

/**
 * Web3Wrapper
 * @todo Wrapper that adds web3-react provider context to app
 * @returns
 */
const Web3Wrapper = ({ children }: { children: JSX.Element }) => {
  function getLibrary(provider: any): ethers.providers.Web3Provider {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Connector>{children}</Web3Connector>
    </Web3ReactProvider>
  );
};

export default Web3Wrapper;
