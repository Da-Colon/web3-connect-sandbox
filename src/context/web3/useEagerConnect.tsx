import { useEffect, useState } from "react";
import config from "../../config";
import { useWeb3React } from "@web3-react/core";

const { connectors } = config;

export function useEagerConnect() {
  const { active, activate } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    connectors.injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(connectors.injected, undefined, true).catch(() => {
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

  return tried;
}
