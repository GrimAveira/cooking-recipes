import Button from "../button/Button";
import styles from "./Header.module.scss";
import { logo } from "../../assets";

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.blur}></div>
      <img className={styles.logo} src={logo} />
      <Button title="Вход" className={styles.button} />
    </header>
  );
}

export default Header;
