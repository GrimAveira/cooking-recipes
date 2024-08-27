import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./RegistrationRoute.module.scss";
import Button from "../../components/button/Button";
import { ChangeEvent, useState } from "react";
import UserService from "../../api/UserService";
import { useMutation } from "react-query";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";
import { IUserData } from "../../interfaces";

const createUser = async (userData: IUserData) => {
	return await UserService.registration(userData);
};

const RegistrationRoute = () => {
	const [userData, setUserData] = useState<IUserData>({
		login: "Tryed",
		password: "213asdagf",
		firstName: "Вася",
		secondName: "Мирнов",
	});

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
					"Логин должен состоять из 3-16 латинских символов и не может включать специальные символы",
				pattern: "^[A-Za-z0-9]{3,16}$",
			},
		},
		// {
		// 	label: { title: "Почта" },
		// 	input: { name: "mail", type: "email", placeholder: "Введите почту" },
		// },
		{
			label: { title: "Пароль" },
			input: { name: "password", type: "password", placeholder: "Введите пароль" },
		},
		{
			label: { title: "Имя" },
			input: {
				name: "firstName",
				placeholder: "Введите имя",
				title: "Имя должно состоять из 1-30 букв и не может включать специальные символы",
				pattern: "^[А-Яа-я]{1,30}$",
			},
		},
		{
			label: { title: "Фамилия" },
			input: {
				name: "secondName",
				placeholder: "Введите фамилию",
				title: "Фамилия должна состоять из 1-30 букв и не может включать специальные символы",
				pattern: "^[А-Яа-я]{1,30}$$",
			},
		},
	];

	const mutationUser = useMutation({
		mutationFn: createUser,
		onSuccess(message: string) {
			promiseSuccess(message);
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
			<p className={styles.p}>Регистрация</p>
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
				<Button title="Зарегистрироваться" className={styles.regButton} type="submit" />
			</form>
		</div>
	);
};

export default RegistrationRoute;
