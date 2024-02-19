import styles from "./Header.module.scss";
import { logo } from "../../assets";
import CustomLink from "../customLink/CustomLink";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../button/Button";
import { useMutation } from "react-query";
import UserService from "../../api/UserService";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";
import { useNavigate } from "react-router-dom";

const logout = async () => {
	try {
		return await UserService.logout();
	} catch (error) {
		return error;
	}
};

const Header = () => {
	const navigate = useNavigate();

	const { isAuth, setIsAuth, setLogin, setRole } = useContext(AuthContext);

	const clickHandler = () => {
		mutationUser.mutate();
	};

	const mutationUser = useMutation({
		mutationFn: logout,
		onSuccess(message: string) {
			promiseSuccess(message);
			setIsAuth(false);
			setLogin(null);
			setRole(null);
			navigate("/");
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	return (
		<header className={styles.container}>
			<div className={styles.blur}></div>
			{/*  */}
			<a href="/" title="На главную">
				<img className={styles.logo} src={logo} />
			</a>
			{isAuth ? (
				<Button className={styles.button} title={"Выход"} onClick={clickHandler} />
			) : (
				<CustomLink to={"/login"} title="Вход" className={styles.button} children={"Вход"} />
			)}
		</header>
	);
};

export default Header;
