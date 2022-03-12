import { FC } from "react";
import { useWeb3Provider } from "../../../lib";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";

const ConnectButton: FC<ConnectButtonProps> = () => {
  const { account } = useWeb3Provider();
  const { openWeb3Modal, deactivateConnector } = useWeb3Provider();
  if(!account) {
    return <Button label="connect" action={openWeb3Modal} isLoading={false} />;
  }
  return <Button label="deactivate" action={deactivateConnector} />
};

export default ConnectButton;
