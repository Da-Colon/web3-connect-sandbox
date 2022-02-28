import { FC, useEffect, useState } from "react";
import cx from "classnames";

export interface ConnectorButtonProps {
  label: string;
  isDisabled: boolean;
  action: () => void;
  isFallback: boolean;
  isConnected: boolean;
  isLoading?: boolean;
}

const clickedAnimation = "focus:translate-y-2 focus:translate-x-2";

const baseStyles = "h-12 my-2 rounded-2xl tracking-wide relative uppercase";
const isConnectedStyles = "cursor-default decent-gradient text-black rounded-2xl";
const disabledStyles = "cursor-default";
const activeStyles = "cursor-pointer decent-gradient text-black rounded-2xl";
const fallbackActiveStyles = "bg-red-900 text-white";
const fallbackStyles = "bg-gray-700 text-gray-500 cursor-default"

const ConnectorButton: FC<ConnectorButtonProps> = ({
  label,
  action,
  isDisabled,
  isFallback,
  isConnected,
  isLoading,
}) => {
  const [clicked, setClick] = useState<boolean>(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => setClick(false), 150);
    }
  });

  const buttonClick = () => {
    setClick(true);
    if (action) {
      action();
    }
  };

  const Label = () => <div>{label}</div>;
  const ActiveIcon = () =>
    isConnected ? (
      <span role="img" aria-label="check">
        ✅
      </span>
    ) : (
      <></>
    );
  const Loading = () => (isLoading ? <div>Loading...</div> : <></>);

  const buttonClassNames = cx(
    baseStyles,
    {
      [clickedAnimation]: clicked && !isDisabled,
    },
    {
      [disabledStyles]: isDisabled && !isConnected,
      [isConnectedStyles]: isDisabled && !isFallback && isConnected,
    },
    { [activeStyles]: !isDisabled && !isFallback },
    {
      [fallbackActiveStyles]: isFallback && !isConnected,
      [fallbackStyles]: isFallback && isConnected,
    }
  );

  return (
    <button className={buttonClassNames} onClick={buttonClick}>
      <div className={cx("absolute top-0 left-0 h-full flex items-center ml-4")}>
        <Loading />
        <ActiveIcon />
      </div>
      <Label />
    </button>
  );
};

export default ConnectorButton;
