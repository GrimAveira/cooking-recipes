import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./LoginRoute.module.scss";
import { ChangeEvent, useContext, useState } from "react";
import { useMutation } from "react-query";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";
import UserService from "../../api/UserService";
import { AuthContext, TRole } from "../../context/AuthContext";
import { IUserData } from "../../interfaces";

const authorization = async (userData: IUserData) => {
	return await UserService.authorization(userData);
};

const LoginRoute = () => {
	const [userData, setUserData] = useState<IUserData>({
		login: "Tryed",
		password: "213asdag",
	});

	const navigate = useNavigate();

	const { setIsAuth, setRole, setLogin } = useContext(AuthContext);

	const changeUserData = (event: ChangeEvent<HTMLInputElement>) => {
		setUserData((state: IUserData) => ({ ...state, [event.target.name]: event.target.value }));
	};

	const inputs = [
		{
			label: { title: "Логин" },
			input: {
				name: "login",
				placeholder: "Введите логин",
				title:
					"Логин должен состоять из 3-16 латинских символов и арабских цифр и не может включать специальные символы",
				pattern: "^[A-Za-z0-9]{3,16}$",
			},
		},
		{
			label: { title: "Пароль" },
			input: { name: "password", type: "password", placeholder: "Введите пароль" },
		},
		// {
		// 	label: { title: "Почта" },
		// 	input: { name: "mail", type: "email", placeholder: "Введите почту" },
		// },
	];

	const mutationUser = useMutation({
		mutationFn: authorization,
		onSuccess(response: { login: string; role: TRole; message: string }) {
			promiseSuccess(response.message);
			setIsAuth(true);
			setRole(response.role);
			setLogin(response.login);
			navigate("/");
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutationUser.mutate(userData);
	};
	return (
		<div className={styles.container}>
			<p className={styles.p}>Вход</p>
			<form className={styles.form} onSubmit={onSubmit}>
				{inputs.map((inputLabel) => {
					return (
						<InputLabel
							key={inputLabel.label.title}
							className={styles.inputForm}
							label={{ title: inputLabel.label.title, fontSize: "18px" }}
							input={{
								...inputLabel.input,
								className: styles.input,
								onChange: changeUserData,
								value: userData[inputLabel.input.name as keyof IUserData],
								required: true,
							}}
						/>
					);
				})}
				<Button title="Войти" className={styles.enterButton} />
				<p className={styles.pReg}>
					{"У вас ещё нет аккаунта? "}
					<Link to="/registration" className={styles.link}>
						Зарегистрироваться
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginRoute;
