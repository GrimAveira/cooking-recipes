import React from "react";
import styles from "./Menu.module.scss";
import { titles } from "../../constants";
import Point from "../menu-point/Point";

interface IProps extends React.LiHTMLAttributes<HTMLLIElement> {
	show: boolean;
}

const BurgerMenu: React.FC<IProps> = ({ show }: IProps) => {
	return (
		<div className={show ? styles.menuShow : styles.menu}>
			<ul className={styles.content}>
				{titles.map(({ title, url, isAuth }) => {
					return <Point key={url} title={title} url={url} reqAuth={isAuth} />;
				})}
			</ul>
			<div className={styles.blur} />
		</div>
	);
};

export default BurgerMenu;
