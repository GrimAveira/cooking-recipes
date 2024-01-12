import Button from "../button/Button";
import styles from "./Header.module.scss";
import { logo } from "../../assets";

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.blur}></div>
      <a href="/" title="На главную">
        <img className={styles.logo} src={logo} />
      </a>
      <Button title="Вход" className={styles.button} />
    </header>
  );
};

export default Header;
