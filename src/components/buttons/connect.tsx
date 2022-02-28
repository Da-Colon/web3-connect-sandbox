import { FC } from "react";
import { useWeb3Connect } from "../../context/web3/Web3Connector";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";

const ConnectButton: FC<ConnectButtonProps> = () => {
  const { openWeb3Modal } = useWeb3Connect();
  return <Button label="connect" action={openWeb3Modal} isLoading={false} />;
};

export default ConnectButton;
