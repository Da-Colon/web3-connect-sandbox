import cx from "classnames";
import { useWeb3Provider } from "../../lib";

const NOT_CONNECTED = "Not Connected";
const Container = ({ children }: { children: JSX.Element[] }) => (
  <div className="flex justify-between gap-12">{children}</div>
);
const Label = ({ label }: { label: string }) => <div>{label}</div>;
const Value = ({ value }: { value: string }) => (
  <div className={cx("px-2", { "bg-red-700": value === NOT_CONNECTED })}>{value}</div>
);

const AccountDisplay = () => {
  const { account, active, chainId, activeConnector } = useWeb3Provider();
  return (
    <div>
      <Container>
        <Label label="account:" />
        <Value value={account || NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="active node:" />
        <Value value={active ? "true" : NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="chain id:" />
        <Value value={chainId?.toString() || NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="connection:" />
        <Value value={activeConnector?.name || NOT_CONNECTED} />
      </Container>
    </div>
  );
};

export default AccountDisplay;
