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
					label={"Логин"}
					input={{ className: styles.input, name: "login" }}
				/>
				<InputLabel
					className={styles.inputForm}
					label={"Пароль"}
					input={{ className: styles.input, name: "password", type: "password" }}
				/>
				<Button title="Войти" className={styles.enterButton} />
			</form>
		</div>
	);
};

export default Login;
