import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Web3Wrapper from "./context/web3/Web3Wrapper";
import { web3Config } from "./config/web3-connect-config";

ReactDOM.render(
  <React.StrictMode>
    <Web3Wrapper config={web3Config}>
      <App />
    </Web3Wrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
