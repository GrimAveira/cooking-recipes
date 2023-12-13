import Button from "../button/Button";
import styles from "./Header.module.scss";
import { logo } from "../../assets";
import Burger from "../burger/Burger.tsx";

interface IProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ show, setShow }: IProps) => {
  return (
    <header className={styles.container}>
      <Burger
        show={show}
        className={styles.menu}
        onClick={() => {
          setShow((show: boolean) => !show);
        }}
      />
      <div className={styles.blur}></div>
      <a href="/">
        <img className={styles.logo} src={logo} />
      </a>
      <Button title="Вход" className={styles.button} />
    </header>
  );
};

export default Header;
