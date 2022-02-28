import { Fragment } from "react";
import ConnectButton from "../buttons/connect";
import AccountDisplay from "../layout/AccountDisplay";
import { SectionWithTitle } from "../layout/Section";

const Connection = () => {
  return (
    <SectionWithTitle title="connection">
      <div className="flex justify-between">
        <AccountDisplay />
        <ConnectButton />
      </div>
    </SectionWithTitle>
  );
};

export default Connection;
