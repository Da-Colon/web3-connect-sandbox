import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openWeb3Modal = () => {
    setShowModal(true);
  };

  const closeWeb3Modal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    openWeb3Modal,
    closeWeb3Modal,
  };
};

export default useModal;
