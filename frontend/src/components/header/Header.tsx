import styles from "./Header.module.scss";
import { logo } from "../../assets";
import Auth from "./Auth";

const Header = () => {
	return (
		<header className={styles.container}>
			<div className={styles.blur}></div>

			{/*  */}
			<a href="/" title="На главную">
				<img className={styles.logo} src={logo} />
			</a>
			<Auth className={styles.auth} />
		</header>
	);
};

export default Header;
