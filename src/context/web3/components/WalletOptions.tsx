import { connectorsByName } from "../connectors";
import WalletOption from "./WalletOption";

const WalletOptions = () => {
  const Options = Object.keys(connectorsByName).map((name) => {
    return <WalletOption name={name} />;
  });
  return <div>{Options}</div>;
};

export default WalletOptions;
