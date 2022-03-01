import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { ConnectorNames, connectorsByName } from "../connectors";
import { useWeb3Connect } from "../Web3Connector";
import ConnectorButton from "./buttons/ConnectorButton";

interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const { connector, error, activate, deactivate } = useWeb3React();
  const { triedEager, activatingConnector, setActivatingConnector } = useWeb3Connect();

  const isFallback = name === ConnectorNames.Fallback;
  const currentConnector = connectorsByName[name];
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;
  
  const action = () => {
    if(disabled) {
      return null
    }
    if (isFallback && !connected) {
      deactivate();
    } else if (isFallback) {
      return null;
    } else {
      setActivatingConnector(currentConnector);
      activate(connectorsByName[name], (error) => {
        if (error) {
          console.log("🚀 ~ file: WalletOption.tsx ~ line 32 ~ error", error)
          setActivatingConnector(undefined);
        }
      });
    }
  };

  return (
    <ConnectorButton
      isDisabled={disabled}
      isLoading={currentConnector === activatingConnector}
      isConnected={connected}
      action={action}
      label={name}
    />
  );
};

export default WalletOption;
