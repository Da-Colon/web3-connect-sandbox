import { FC } from "react";
import { Connector, ConnectorNames } from "../../../hooks/useConnectors";
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import ConnectorButton from "../../ui/buttons/ConnectorButton";
interface WalletOptionProps {
  connectorOption: Connector;
}
const WalletOption: FC<WalletOptionProps> = ({ connectorOption }) => {
  const { connector, error, triedEager, activatingConnector, activateConnector, deactivate } =
    useWeb3Provider();

  const isFallback = connectorOption.name === ConnectorNames.Fallback;

  const connected = connectorOption?.connector === connector;
  const isLoading = connectorOption?.connector === activatingConnector?.connector;
  
  const disabled = !triedEager || !!activatingConnector || connected || !!error || isLoading;

  const action = () => {
    if (disabled) {
      return null;
    }
    if (isFallback && !connected) {
      deactivate();
    } else if (isFallback) {
      return null;
    } else {
      activateConnector(connectorOption?.name);
    }
  };

  return (
    <ConnectorButton
      logo={connectorOption?.logo}
      isDisabled={disabled}
      isLoading={isLoading}
      isConnected={connected}
      action={action}
      label={connectorOption.name}
    />
  );
};

export default WalletOption;
