import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import InputLabel from "../../components/labelInput/InputLabel";
import styles from "./Login.module.scss";

const Login = () => {
	return (
		<div className={styles.container}>
			<p className={styles.p}>Вход</p>
			<form className={styles.form}>
				<InputLabel
					className={styles.inputForm}
					label={{ title: "Логин" }}
					input={{ className: styles.input, name: "login", placeholder: "Введите логин" }}
				/>
				<InputLabel
					className={styles.inputForm}
					label={{ title: "Пароль" }}
					input={{
						className: styles.input,
						name: "password",
						type: "password",
						placeholder: "Введите пароль",
					}}
				/>
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

export default Login;
