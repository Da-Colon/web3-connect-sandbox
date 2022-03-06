import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const useModal = () => {
  // web3-react
  const web3React = useWeb3React();

  // connector currently activating
  const [activatingConnector, setActivatingConnector] = useState<any>();
  // controls modal showing
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (activatingConnector && activatingConnector === web3React.connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, web3React.connector]);

  const openWeb3Modal = () => {
    setShowModal(true);
  };

  const closeWeb3Modal = () => {
    setShowModal(false);
  };

  return {
    activatingConnector,
    showModal,
    setActivatingConnector,
    openWeb3Modal,
    closeWeb3Modal,
  };
};

export default useModal;
