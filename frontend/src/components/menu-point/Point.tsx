import React from "react";
import styles from "./Point.module.scss";

interface IProps extends React.LiHTMLAttributes<HTMLLIElement> {
  title: string;
  url: string;
}

const Point: React.FC<IProps> = ({ title, url }) => {
  return (
    <li className={styles.li}>
      <a href={url}>{title}</a>
    </li>
  );
};

export default Point;
