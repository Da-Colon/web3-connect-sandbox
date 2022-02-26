import { Fragment } from "react";
import ConnectButton from "../buttons/connect";
import AccountDisplay from "../layout/AccountDisplay";
import { SectionWithTitle } from "../layout/Section";

const Connection = () => {
  return (
    <SectionWithTitle title="connection">
      <Fragment>
        <ConnectButton />
        <AccountDisplay />
      </Fragment>
    </SectionWithTitle>
  );
};

export default Connection;
