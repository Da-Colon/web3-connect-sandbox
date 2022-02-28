import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { ConnectorNames, connectorsByName } from "../connectors";
import { useWeb3Connect } from "../Web3Connector";
import ConnectorButton from "./buttons/ConnectorButton";

interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const { connector, error, activate } = useWeb3React();
  const { triedEager, activatingConnector, setActivatingConnector } = useWeb3Connect();

  const currentConnector = connectorsByName[name];
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  const isFallback = name === ConnectorNames.Fallback;
  return (
    <ConnectorButton
      isDisabled={disabled || isFallback}
      isLoading={currentConnector === activatingConnector}
      isFallback={isFallback}
      isConnected={connected}
      action={() => {
        setActivatingConnector(currentConnector);
        activate(connectorsByName[name], (error) => {
          if (error) {
            setActivatingConnector(undefined);
          }
        });
      }}
      label={name}
    />
  );
};

export default WalletOption;
