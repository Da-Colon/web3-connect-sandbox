import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { connectorsByName } from "../connectors";
import { useWeb3Connect } from "../Web3Connector";

interface WalletOptionProps {
  name: string;
}
const WalletOption: FC<WalletOptionProps> = ({ name }) => {
  const web3React = useWeb3React();
  const web3Connect = useWeb3Connect();
  
  const currentConnector = connectorsByName[name];
  const activating = currentConnector === web3Connect.activatingConnector;
  const connected = currentConnector === web3React.connector;
  const disabled =
    !web3Connect.triedEager || !!web3Connect.activatingConnector || connected || !!web3React.error;

  return (
    <button
      style={{
        height: "3rem",
        borderRadius: "1rem",
        borderColor: activating ? "orange" : connected ? "green" : "unset",
        cursor: disabled ? "unset" : "pointer",
        position: "relative",
      }}
      disabled={disabled}
      onClick={() => {
        web3Connect.setActivatingConnector(currentConnector);
        web3React.activate(connectorsByName[name], (error) => {
          if (error) {
            web3Connect.setActivatingConnector(undefined);
          }
        });
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          display: "flex",
          alignItems: "center",
          color: "black",
          margin: "0 0 0 1rem",
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
  );
};

export default WalletOption;
