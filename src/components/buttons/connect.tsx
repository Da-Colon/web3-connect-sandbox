import { FC } from "react";
import { useWeb3Connect } from "../../context/web3/Web3Connector";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";
import { useWeb3React } from '@web3-react/core';

const ConnectButton: FC<ConnectButtonProps> = () => {
  const { account, deactivate } = useWeb3React();
  const { openWeb3Modal } = useWeb3Connect();
  if(!account) {
    return <Button label="connect" action={openWeb3Modal} isLoading={false} />;
  }
  return <Button label="deactivate" action={deactivate} />
};

export default ConnectButton;
