import WalletOption from "./WalletOption";
import { useWeb3Provider } from "../../../hooks/useWeb3Provider";
import { Connector, ConnectorNames } from "../../../hooks/useConnectors";

const WalletOptions = () => {
  const { connectors } = useWeb3Provider();
  if(!connectors) {
    // @todo add loader
    return <></>
  }
  const Options = Array.from<Connector>(connectors.values())
  .filter((connector: Connector) => connector.name !== ConnectorNames.Fallback)
  .map((connector, i) => {
    return <WalletOption connectorOption={connector} key={connector.name + i} />;
  });
  return <div className="flex flex-col mt-4 p-4">{Options}</div>;
};

export default WalletOptions;
