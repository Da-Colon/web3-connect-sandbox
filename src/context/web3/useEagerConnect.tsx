import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import connectors from "./connectors";


export function useEagerConnect() {
  const { active, activate, account } = useWeb3React();
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

  useEffect(() => {
    if(!account) {
      activate(connectors.fallback)
    }
  }, [account])

  return tried;
}
