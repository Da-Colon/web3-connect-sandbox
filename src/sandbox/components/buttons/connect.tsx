import { FC } from "react";
import { useWeb3Provider } from "../../../lib";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";

const ConnectButton: FC<ConnectButtonProps> = () => {
  const { account, deactivate } = useWeb3Provider();
  const { openWeb3Modal } = useWeb3Provider();
  if(!account) {
    return <Button label="connect" action={openWeb3Modal} isLoading={false} />;
  }
  return <Button label="deactivate" action={deactivate} />
};

export default ConnectButton;
