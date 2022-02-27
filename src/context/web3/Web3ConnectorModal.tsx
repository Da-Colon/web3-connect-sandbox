import { FC, useEffect, useState } from "react";
import cx from "classnames";
import DecentLogo from "./assets/DecentLogo";

interface Web3ConnectorModalProps {
  showModal: boolean;
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
      <div className="border-2 p-4 w-80 bg-black border-decent h-min">
        <DecentLogo />
      </div>
    </div>
  );
};

export default Web3ConnectorModal;
