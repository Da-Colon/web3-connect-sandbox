import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext } from "react";
import Web3ConnectorModal from "../components/Web3ConnectorModal";
import type { Web3Config } from "../types";
import useConnectors from "./useConnectors";
import { useEagerConnect } from "./useEagerConnect";
import useInactiveListener from "./useInactiveListeners";
import useModal from "./useModal";

// @todo show toast message
// @todo should check for custom css file
// @todo configure useWeb3Provider to return only what is needed

const createWeb3Root = (context: React.Context<any>) => {
  const Web3Root = ({ config, children }: { config: Web3Config; children: JSX.Element }) => {
    // handles ui logic for modal
    const { showModal, openWeb3Modal, closeWeb3Modal } = useModal();

    // handles connectors logic checking project config `web3-connect-config.js'
    const { connectors, activatingConnector, activeConnector, activateConnector } = useConnectors(config);

    // handles logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect(connectors, activateConnector);

    // handles logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector, activateConnector);

    return (
      <context.Provider
        value={{
          triedEager,
          activatingConnector,
          connectors,
          activeConnector,
          openWeb3Modal,
          activateConnector,
          ...useWeb3React(),
        }}
      >
        <Web3ConnectorModal showModal={showModal} closeWeb3Modal={closeWeb3Modal} />
        {children}
      </context.Provider>
    );
  };

  return Web3Root;
};

const web3Context = createContext<any>({});

const Web3Provider = createWeb3Root(web3Context);

const useWeb3Provider = () => {
  return useContext(web3Context);
};

export { Web3Provider, useWeb3Provider };
