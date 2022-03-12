import { FC } from "react";
import classnames from "classnames";
import useLoader from "../hooks/useLoader";

export enum LoaderSize {
  "button",
}

interface DotsLoaderProps {
  size: LoaderSize;
}
export const DotsLoader: FC<DotsLoaderProps> = ({ size }) => {
  const { loaderObjArr } = useLoader(String.fromCodePoint(1805));

  const loaderContainerStyles = classnames("py-1 animate-pulse");
  const loaderObjectStyles = classnames({ "mx-2 inline-block text-xl": size === LoaderSize.button });

  const MappedLoaderComponent = loaderObjArr.map((loaderObj, i) => {
    return <div key={loaderObj + i} className={loaderObjectStyles}>{loaderObj}</div>;
  });

  return <div className={loaderContainerStyles}>{MappedLoaderComponent}</div>;
};
