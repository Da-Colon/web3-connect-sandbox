import { FC } from "react";
import { ConnectorNames } from "../../../hooks/useConnectors";
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import ConnectorButton from "../../ui/buttons/ConnectorButton";

interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const {
    connector,
    error,
    triedEager,
    activatingConnector,
    activateConnector,
    deactivate,
    connectorsByName,
  } = useWeb3Provider();

  const isFallback = name === ConnectorNames.Fallback;
  const currentConnector = connectorsByName[name];
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  const action = () => {
    if (disabled) {
      return null;
    }
    if (isFallback && !connected) {
      deactivate();
    } else if (isFallback) {
      return null;
    } else {
      activateConnector(name);
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
