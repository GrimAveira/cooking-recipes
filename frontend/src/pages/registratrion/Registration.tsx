import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./Registration.module.scss";
import Button from "../../components/button/Button";

const Registration = () => {
	return (
		<div className={styles.container}>
			<p className={styles.p}>Регистрация</p>
			<form className={styles.form}>
				<InputLabel
					className={styles.inputForm}
					label={"Логин"}
					input={{ className: styles.input, name: "login", placeholder: "Введите логин" }}
				/>
				<InputLabel
					className={styles.inputForm}
					label={"Почта"}
					input={{
						className: styles.input,
						name: "mail",
						placeholder: "Введите почту",
					}}
				/>
				<InputLabel
					className={styles.inputForm}
					label={"Пароль"}
					input={{
						className: styles.input,
						name: "password",
						type: "password",
						placeholder: "Введите пароль",
					}}
				/>
				<Button title="Зарегистрироваться" className={styles.regButton} />
			</form>
		</div>
	);
};

export default Registration;
