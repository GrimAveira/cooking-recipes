import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {props.title}
    </button>
  );
};

export default Button;
