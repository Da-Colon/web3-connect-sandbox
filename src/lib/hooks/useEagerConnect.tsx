import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Connector, ConnectorNames } from "./useConnectors";

export function useEagerConnect(
  connectors: any,
  activateConnector: (_connectorName: string) => Promise<void>,
  activeConnector?: Connector
) {
  const { active, account } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!tried) {
      connectors
        .get(ConnectorNames.Injected)
        .connector.isAuthorized()
        .then((isAuthorized: boolean) => {
          if (isAuthorized) {
            activateConnector(ConnectorNames.Injected).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        });
    }
  }, [tried, activateConnector, connectors]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  useEffect(() => {
    if (!account && tried && !activeConnector) {
      activateConnector(ConnectorNames.Fallback);
    }
  }, [account, tried, activeConnector, activateConnector]);

  return tried;
}
