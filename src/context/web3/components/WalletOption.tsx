import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import connectors, { ConnectorNames, connectorsByName } from "../connectors";
import { useWeb3Connect } from "../Web3Connector";
import cx from "classnames";
import ConnectorButton from "./buttons/ConnectorButton";

interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const web3React = useWeb3React();
  const web3Connect = useWeb3Connect();

  const currentConnector = connectorsByName[name];
  const connected = currentConnector === web3React.connector;
  const disabled =
    !web3Connect.triedEager || !!web3Connect.activatingConnector || connected || !!web3React.error;

  const isFallback = name === ConnectorNames.Fallback;
  return (
    <ConnectorButton
      isDisabled={disabled || isFallback}
      isLoading={currentConnector === web3Connect.activatingConnector}
      isFallback={isFallback}
      isConnected={connected}
      action={() => {
        web3Connect.setActivatingConnector(currentConnector);
        web3React.activate(connectorsByName[name], (error) => {
          if (error) {
            web3Connect.setActivatingConnector(undefined);
          }
        });
      }}
      label={name}
    />
  );
};

export default WalletOption;
