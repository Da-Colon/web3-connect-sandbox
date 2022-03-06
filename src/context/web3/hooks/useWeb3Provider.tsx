import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Web3Config } from "../types";
import Web3ConnectorModal from "../components/layout/Web3ConnectorModal";
import useConnectors from "./useConnectors";
import { useEagerConnect } from "./useEagerConnect";
import useInactiveListener from "./useInactiveListeners";
import useModal from "./useModal";

// @todo this adds options for modal
// @todo if config file present init provider wrapper
// @todo if file is not present, handle no fallback? ethers? connect to injector to
// @todo show toast message
// @todo should extend useWeb3Provider hook.
// @todo should check for custom css file

const createWeb3Root = (context: React.Context<any>) => {
  const Web3Root = ({ config, children }: { config: Web3Config; children: JSX.Element }) => {
    // handles ui logic for modal
    const { activatingConnector, showModal, setActivatingConnector, openWeb3Modal, closeWeb3Modal } =
      useModal();
    // handles connectors
    const { connectors, connectorsByName, getConnectorName } = useConnectors(config);
    // handles logic to check project config `web3-connect-config.js'

    // handles logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect(connectors);

    // handles logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector, connectors);

    return (
      <context.Provider
        value={{
          triedEager,
          activatingConnector,
          setActivatingConnector,
          openWeb3Modal,
          connectors,
          connectorsByName,
          getConnectorName,
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
