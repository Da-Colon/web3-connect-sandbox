import { FC, useEffect, useRef, useState } from "react";
import cx from "classnames";
import DecentLogo from "./DecentLogo";
import WalletOptions from "./WalletOptions";

interface Web3ConnectorModalProps {
  showModal: boolean;
  closeWeb3Modal: () => void;
}

const Web3ConnectorModal: FC<Web3ConnectorModalProps> = ({ showModal, closeWeb3Modal }) => {
  const overlayRef = useRef<HTMLHeadingElement>(null);

  const [isShown, setShown] = useState(false);
  const [isRendered, setRendered] = useState(false);

  const renderComponent = () => {
    setRendered(true);
    setTimeout(() => setShown(true), 10);
  };

  const unMountComponent = () => {
    setShown(false);
    setTimeout(() => setRendered(false), 150);
  };

  useEffect(() => {
    if (!isShown && showModal) {
      setTimeout(() => renderComponent());
    }
    if (isShown && !showModal) {
      setTimeout(() => unMountComponent());
    }
  }, [isShown, showModal]);

  if (!isRendered) {
    return null;
  }


  return (
    <div
      className={cx("absolute flex flex-col items-center justify-center h-full w-full bg-overlay z-10 top-0", {
        "flex justify-end": isShown,
        'hidden': !isShown,
      })}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          closeWeb3Modal();
        }
      }}
      ref={overlayRef}
    >
      <div className="border-2 p-4 w-96 bg-black border-decent h-min flex flex-col rounded-md">
        <DecentLogo />
        <WalletOptions />
      </div>
    </div>
  );
};

export default Web3ConnectorModal;
