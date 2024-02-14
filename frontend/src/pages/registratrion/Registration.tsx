import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./Registration.module.scss";
import Button from "../../components/button/Button";
import { ChangeEvent, useState } from "react";
import UserService from "../../api/UserService";
import { useMutation } from "react-query";

export interface IUserData {
	login: string;
	password: string;
	firstName: string;
	secondName: string;
}

const createUser = async (userData: IUserData) => {
	return UserService.registration(userData);
};

const Registration = () => {
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
		onSuccess(data: string) {
			console.log(data);
		},
	});

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutationUser.mutate(userData);
	};

	console.log(userData);

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
							}}
						/>
					);
				})}
				<Button title="Зарегистрироваться" className={styles.regButton} type="submit" />
			</form>
		</div>
	);
};

export default Registration;
