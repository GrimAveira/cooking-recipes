import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";
import Button from "../button/Button";
import CustomLink from "../customLink/CustomLink";
import UserService from "../../api/UserService";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.scss";

const logout = async () => {
	return await UserService.logout();
};

const Auth = (props: React.HTMLAttributes<HTMLDivElement>) => {
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
		<div {...props}>
			{isAuth ? (
				<Button className={styles.button} title={"Выход"} onClick={clickHandler} />
			) : (
				<CustomLink to={"/login"} title="Вход" className={styles.button} children={"Вход"} />
			)}
		</div>
	);
};

export default Auth;
