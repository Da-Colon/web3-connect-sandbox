import { FC } from "react";
import { AppWrapperProps } from "./interfaces";

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AppWrapper;
