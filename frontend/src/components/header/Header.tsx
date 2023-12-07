import Button from "../button/Button";
import styles from "./Header.module.scss";
import { logo, menu } from "../../assets";

const Header = () => {
  return (
    <header className={styles.container}>
      <img className={styles.menu} src={menu} />
      <div className={styles.blur}></div>
      <a href="/">
        <img className={styles.logo} src={logo} />
      </a>
      <Button title="Вход" className={styles.button} />
    </header>
  );
};

export default Header;
