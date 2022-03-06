import WalletOption from "./WalletOption";
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import { ConnectorNames } from "../../../types/index.d";

const WalletOptions = () => {
  const { connectorsByName } = useWeb3Provider();
  const Options = Object.keys(connectorsByName)
    .filter((name) => name !== ConnectorNames.Fallback)
    .map((name, i) => {
      return <WalletOption name={name} key={name + i} />;
    });
  return <div className="flex flex-col mt-4 p-4">{Options}</div>;
};

export default WalletOptions;
