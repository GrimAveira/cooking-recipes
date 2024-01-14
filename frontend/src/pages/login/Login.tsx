import Input from "../../components/input/Input";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <p className={styles.p}>Вход</p>
      <form className={styles.form}>
        <label htmlFor=""></label>
        <Input className={styles.input} />
        <label htmlFor=""></label>
        <Input className={styles.input} />
      </form>
    </div>
  );
};

export default Login;
