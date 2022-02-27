import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";

const ConnectButton: FC<ConnectButtonProps> = () => {
  const web3React = useWeb3React()
  console.table(web3React)
  return <Button label="connect" action={() => null} isLoading={false} />;
};

export default ConnectButton;
