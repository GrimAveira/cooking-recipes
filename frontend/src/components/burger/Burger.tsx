import React from "react";
import styles from "./Burger.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
	show: boolean;
}

const Burger: React.FC<IProps> = (props) => {
	const { show, ...remainProps } = props;
	return (
		<div
			{...remainProps}
			className={`${styles.container} ${remainProps.className}`}
		>
			<ul>
				<li className={show ? styles.lineTop : styles.line} />
				<li className={show ? styles.lineMid : styles.line} />
				<li className={show ? styles.lineBot : styles.line} />
			</ul>
		</div>
	);
};

export default Burger;
