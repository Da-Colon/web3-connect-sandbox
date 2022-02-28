import { FC, useEffect, useState } from "react";
import cx from "classnames";
import DecentLogo from "./assets/DecentLogo";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import WalletOptions from "./components/WalletOptions";
interface Web3ConnectorModalProps {
  showModal: boolean;
}

/**
 * @todo add toast messages for errors
 * @param error 
 * @returns 
 */
const getErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

const Web3ConnectorModal: FC<Web3ConnectorModalProps> = ({ showModal }) => {
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
        <WalletOptions />
      </div>
    </div>
  );
};

export default Web3ConnectorModal;
