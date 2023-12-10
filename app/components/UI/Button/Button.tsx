import React, { ReactNode, MouseEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
