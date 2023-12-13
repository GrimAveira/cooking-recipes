import React from "react";
import styles from "./BurgerMenu.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

const BurgerMenu: React.FC<IProps> = ({ show }: IProps) => {
  return <div className={show ? styles.menuShow : styles.menu}></div>;
};

export default BurgerMenu;
