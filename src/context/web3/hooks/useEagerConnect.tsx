import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "./useConnectors";


export function useEagerConnect(connectors: any, activateConnector: (_connectorName: string) => Promise<void>) {
  const { active, account } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    connectors.injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activateConnector(ConnectorNames.Injected).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  useEffect(() => {
    if(!account) {
      activateConnector(ConnectorNames.Fallback)
    }
  }, [account])

  return tried;
}
