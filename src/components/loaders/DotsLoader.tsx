import { FC } from "react";
import useLoader from "../hooks/useLoader";
import { DotsLoaderProps, loaderSize } from "./interfaces";
import classnames from "classnames";

export const DotsLoader: FC<DotsLoaderProps> = ({ size }) => {
  const { loaderObjArr } = useLoader("*");

  const loaderContainerStyles = classnames("py-1 animate-pulse");
  const loaderObjectStyles = classnames({'mx-2 inline-block': size === loaderSize.button})

  const MappedLoaderComponent = loaderObjArr.map((loaderObj) => {
    return <div className={loaderObjectStyles}>{loaderObj}</div>;
  });

  return <div className={loaderContainerStyles}>{MappedLoaderComponent}</div>;
};
