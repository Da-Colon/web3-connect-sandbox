import { FC, useEffect, useState } from "react";
import classnames from "classnames";
import { DotsLoader } from "../loaders/DotsLoader";
import { loaderSize } from "../loaders/interfaces";
import { ButtonProps } from "./interfaces";

const clickedAnimation = "focus:translate-y-2 focus:translate-x-2";
const baseStyles = "border border-white px-2 w-28 cursor-pointer transform h-8";

const Button: FC<ButtonProps> = ({ label, action, isLoading }) => {
  const [clicked, setClick] = useState<boolean>(false);
  useEffect(() => {
    if (clicked) { 
      setTimeout(() => setClick(false), 150);
    }
  });

  const buttonClick = () => {
    setClick(true);
    if(action) {
      action()
      
    }
  }

  const Label = () => (isLoading ? <DotsLoader size={loaderSize.button} /> : <div>{label}</div>);

  const buttonStyles = classnames(baseStyles, {
    [clickedAnimation]: clicked,
  });
  return (
    <button className={buttonStyles} onClick={buttonClick}>
      <Label />
    </button>
  );
};

export default Button;
