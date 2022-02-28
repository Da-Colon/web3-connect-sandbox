import { connectorsByName } from "../connectors";
import WalletOption from "./WalletOption";

const WalletOptions = () => {
  const Options = Object.keys(connectorsByName).map((name, i) => {
    return <WalletOption name={name} key={name+i}/>;
  });
  return <div className="flex flex-col mt-4 p-4">{Options}</div>;
};

export default WalletOptions;
