import React, { useContext } from "react";
import styles from "./Point.module.scss";
import { promiseFail } from "../../functions/toastTrigger";
import { AuthContext } from "../../context/AuthContext";

interface IProps extends React.LiHTMLAttributes<HTMLLIElement> {
	title: string;
	url: string;
	reqAuth: boolean;
}

const Point: React.FC<IProps> = ({ title, url, reqAuth }) => {
	const { isAuth } = useContext(AuthContext);

	return (
		<li className={styles.li}>
			{reqAuth ? (
				isAuth ? (
					<a href={url}>{title}</a>
				) : (
					<a onClick={() => promiseFail("Вы не вошли в систему")}>{title}</a>
				)
			) : (
				<a href={url}>{title}</a>
			)}
		</li>
	);
};

export default Point;
