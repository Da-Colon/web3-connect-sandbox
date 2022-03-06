import cx from 'classnames'
import { useWeb3Provider } from '../../context/web3/hooks/useWeb3Provider';

const NOT_CONNECTED = 'Not Connected'
const Container = ({children}: {children: JSX.Element[]}) => <div className="flex justify-between gap-12">{children}</div>
const Label = ({label}: {label: string}) => <div>{label}</div>;
const Value = ({value}: {value: string}) => <div className={cx('px-2', {'bg-red-700': value === NOT_CONNECTED})}>{value}</div>;

const AccountDisplay = () => {
  const web3 = useWeb3Provider();
  const connectedName = web3.selectedConnector;
  return (
    <div>
      <Container>
        <Label label="account:" />
        <Value value={web3.account || NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="active node:" />
        <Value value={web3.active ? "true" : NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="chain id:" />
        <Value value={web3.chainId?.toString() || NOT_CONNECTED} />
      </Container>
      <Container>
        <Label label="connection:" />
        <Value value={connectedName || NOT_CONNECTED} />
      </Container>
    </div>
  );
};

export default AccountDisplay;
