import React from "react";
import styles from "./Burger.module.scss";

const Burger: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`${styles.container} ${props.className}`}>
      <div>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
    </div>
  );
};

export default Burger;
