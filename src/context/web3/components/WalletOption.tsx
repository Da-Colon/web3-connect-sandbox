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
  const disabled = !triedEager || !!activatingConnector || connected || !!error || (isFallback && connected);


  const action = () => {
    if(isFallback) {
      deactivate()
    } else {
      setActivatingConnector(currentConnector);
        activate(connectorsByName[name], (error) => {
          if (error) {
            setActivatingConnector(undefined);
          }
        });
    }
  }
  const label = isFallback && !connected ? 'Deactivate' : name

  return (
    <ConnectorButton
      isDisabled={disabled}
      isLoading={currentConnector === activatingConnector}
      isFallback={isFallback}
      isConnected={connected}
      action={action}
      label={label}
    />
  );
};

export default WalletOption;
