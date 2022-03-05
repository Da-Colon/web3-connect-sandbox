import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import Web3ConnectorModal from "../components/layout/Web3ConnectorModal";
import { useEagerConnect } from "./useEagerConnect";
import useInactiveListener from "./useInactiveListeners";

// @todo this adds options for modal
const createWeb3Root = (context: React.Context<any>) => {
  const Web3Root = ({ children }: { children: React.ReactNode }) => {
    const { connector } = useWeb3React();
    const [activatingConnector, setActivatingConnector] = useState<any>();
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, connector]);

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
          openWeb3Modal
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

const Web3Connector = createWeb3Root(web3Context);

const useWeb3Connect = () => {
  return useContext(web3Context);
};

export { Web3Connector, useWeb3Connect };
