import { FC } from "react";
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import ConnectorButton from "../../ui/buttons/ConnectorButton";
import { ConnectorNames } from "../../../types/index.d";
interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const {
    connector,
    error,
    activate,
    triedEager,
    activatingConnector,
    setActivatingConnector,
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
      setActivatingConnector(currentConnector);
      activate(connectorsByName[name], (error: any) => {
        if (error) {
          console.log("🚀 ~ file: WalletOption.tsx ~ line 32 ~ error", error);
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
