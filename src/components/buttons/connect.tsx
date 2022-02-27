import { FC } from "react";
import Button from "./button";
import { ConnectButtonProps } from "./interfaces";

const ConnectButton: FC<ConnectButtonProps> = () => {
  // @todo this opens modal
  return <Button label="connect" action={() => null} isLoading={false} />;
};

export default ConnectButton;
