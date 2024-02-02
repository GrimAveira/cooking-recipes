import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./Registration.module.scss";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { RegistrationState, changeUserRegData } from "../../store/reducers/registrationSlice";
import { ChangeEvent } from "react";

const Registration = () => {
	const registraionInfo = useSelector((state: RootState) => state.registrationReducer);
	const dispatch = useDispatch();

	const changeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeUserRegData({ name: event.target.name, value: event.target.value }));
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

	const submitHandler = () => {};

	return (
		<div className={styles.container}>
			<p className={styles.p}>Регистрация</p>
			<form className={styles.form} onSubmit={() => console.log("submit")}>
				{inputs.map((inputLabel) => {
					return (
						<InputLabel
							key={inputLabel.label.title}
							className={styles.inputForm}
							label={{ title: inputLabel.label.title, fontSize: "18px" }}
							input={{
								...inputLabel.input,
								className: styles.input,
								onChange: changeHandlerInput,
								value: registraionInfo[inputLabel.input.name as keyof RegistrationState],
							}}
						/>
					);
				})}
				<Button title="Зарегистрироваться" className={styles.regButton} />
			</form>
		</div>
	);
};

export default Registration;
