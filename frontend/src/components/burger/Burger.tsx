import React from "react";
import styles from "./Burger.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  show: boolean;
}

const Burger: React.FC<IProps> = (props) => {
  return (
    <div {...props} className={`${styles.container} ${props.className}`}>
      <div>
        <div className={`${props.show ? styles.lineTop : styles.line}`} />
        <div className={`${props.show ? styles.lineMid : styles.line}`} />
        <div className={`${props.show ? styles.lineBot : styles.line}`} />
      </div>
    </div>
  );
};

export default Burger;
