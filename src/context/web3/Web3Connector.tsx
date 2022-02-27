import { useWeb3React } from "@web3-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useEagerConnect } from "./useEagerConnect";
import useInactiveListener from "./useInactiveListeners";
import Web3ConnectorModal from "./Web3ConnectorModal";

// @todo this adds options for modal
const createWeb3Root = (context: React.Context<any>) => {
  const Web3Root = ({ children }: { children: React.ReactNode }) => {
    const { connector } = useWeb3React();
    const [activatingConnector, setActivatingConnector] = useState<any>();

    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, connector]);

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

    return (
      <context.Provider
        value={{
          triedEager,
          activatingConnector,
          setActivatingConnector,
        }}
      >
        <Web3ConnectorModal showModal={true} />
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
