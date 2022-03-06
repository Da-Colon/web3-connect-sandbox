import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import Web3ConnectorModal from "../components/layout/Web3ConnectorModal";
import { useEagerConnect } from "./useEagerConnect";
import useInactiveListener from "./useInactiveListeners";

// @todo this adds options for modal
// @todo if config file present init provider wrapper
// @todo if file is not present, handle no fallback? ethers? connect to injector to
// @todo show toast message
// @todo should extend useWeb3Provider hook.
// @todo should check for custom css file

const createWeb3Root = (context: React.Context<any>) => {
  const Web3Root = ({ children }: { children: React.ReactNode }) => {

    // web3-react
    const web3React = useWeb3React();

    // activing connector modal UI state
    const [activatingConnector, setActivatingConnector] = useState<any>();
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
      if (activatingConnector && activatingConnector === web3React.connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, web3React.connector]);

    // handle logic to check project config `web3-connect-config.js'

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
    
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);


    const openWeb3Modal = () => {
      setShowModal(true)
    }

    const closeWeb3Modal = () => {
      setShowModal(false)
    }

    return (
      <context.Provider
        value={{
          triedEager,
          activatingConnector,
          setActivatingConnector,
          openWeb3Modal,
          ...web3React
        }}
      >
        <Web3ConnectorModal showModal={showModal} closeWeb3Modal={closeWeb3Modal}/>
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
