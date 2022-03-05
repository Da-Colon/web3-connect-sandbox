import { FC, useEffect, useRef, useState } from "react";
import cx from "classnames";
import DecentLogo from "../../../assets/DecentLogo";
import WalletOptions from "../WalletOptions";

interface Web3ConnectorModalProps {
  showModal: boolean;
  closeWeb3Modal: () => void;
}

const Web3ConnectorModal: FC<Web3ConnectorModalProps> = ({ showModal, closeWeb3Modal }) => {
  const [show, setShow] = useState(false);

  const overlayRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!show && showModal) {
      setTimeout(() => setShow(true));
    }
    if (show && !showModal) {
      setTimeout(() => setShow(false));
    }
  }, [showModal]);

  return (
    <div
      className={cx("absolute flex flex-col items-center justify-center h-full w-full bg-overlay z-10 top-0", {
        "flex justify-end": show,
        hidden: !show,
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
