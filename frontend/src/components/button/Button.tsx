import React from "react";
import styles from "./Button.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: React.FC<IProps> = (props) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {props.title}
    </button>
  );
};

export default Button;
