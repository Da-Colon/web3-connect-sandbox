import { FC, useEffect, useState } from "react";
import cx from "classnames";
import DecentLogo from "./assets/DecentLogo";
import config from "../../config";
import { UnsupportedChainIdError} from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { useWeb3React } from '@web3-react/core';
import { useWeb3Connect } from "./Web3Connector";
interface Web3ConnectorModalProps {
  showModal: boolean;
}

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
}

const connectorsByName: any = {
  [ConnectorNames.Injected]: config.connectors.injected,
  [ConnectorNames.WalletConnect]: null
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const Web3ConnectorModal: FC<Web3ConnectorModalProps> = ({ showModal }) => {
  const web3React = useWeb3React();
  const webConnect = useWeb3Connect();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show && showModal) {
      setTimeout(() => setShow(true), 250);
    }
  }, [showModal]);

  return (
    <div
      className={cx("absolute h-full w-full bg-overlay z-10 top-0", {
        "flex justify-end": show,
        hidden: !show,
      })}
    >
      <div className="border-2 p-4 w-80 bg-black border-decent h-min flex flex-col">
        <DecentLogo />
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === webConnect.activatingConnector
          const connected = currentConnector === web3React.connector
          const disabled = !webConnect.triedEager || !!webConnect.activatingConnector || connected || !!web3React.error

          return (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative'
              }}
              disabled={disabled}
              key={name}
              onClick={() => {
                webConnect.setActivatingConnector(currentConnector)
                web3React.activate(connectorsByName[name], (error) => {
                  if (error) {
                    webConnect.setActivatingConnector(undefined)
                  }
                })
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <div>Loading...</div>}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default Web3ConnectorModal;
