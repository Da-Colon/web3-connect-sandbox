import { FC, useEffect, useState } from "react";
import cx from "classnames";
import { DotsLoader, LoaderSize } from "../loaders/DotsLoader";

export interface ConnectorButtonProps {
  label: string;
  logo: string;
  isDisabled: boolean;
  action: () => void;
  isConnected: boolean;
  isLoading?: boolean;
}

const clickedAnimation = "focus:translate-y-2 focus:translate-x-2";

const baseStyles =
  "h-12 my-2 rounded-2xl tracking-wide relative uppercase cursor-pointer decent-gradient text-black rounded-2xl";
const isConnectedStyles = "cursor-default decent-gradient text-black rounded-2xl";
const disabledStyles = "cursor-default";

const ConnectorButton: FC<ConnectorButtonProps> = ({
  label,
  logo,
  action,
  isDisabled,
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
      <span role="img" aria-label="check" className="">
        ✅
      </span>
    ) : (
      <></>
    );

  const buttonClassNames = cx(
    baseStyles,
    {
      [clickedAnimation]: clicked && !isDisabled,
    },
    {
      [disabledStyles]: isDisabled && !isConnected,
      [isConnectedStyles]: isDisabled && isConnected,
    }
  );

  return (
    <button className={buttonClassNames} onClick={buttonClick}>
      {isLoading ? (
        <DotsLoader size={LoaderSize.button} />
      ) : (
        <>
          <div className="absolute h-8 w-8 top-2 left-4">
            <img src={logo} alt="" className="h-full w-full" />
          </div>
          <div className={cx("absolute top-0 right-5 h-full flex items-center ml-4")}>
            {isConnected && <ActiveIcon />}
          </div>
          <Label />
        </>
      )}
    </button>
  );
};

export default ConnectorButton;
