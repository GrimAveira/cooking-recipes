import styles from "./Footer.module.scss";
import { icons } from "../../constants/index";

interface URLIconI {
	title: string;
	url: string;
	svg: string;
}

const URLIcon = (icon: URLIconI) => {
	return (
		<li>
			<a href={icon.url} title={icon.url} className={styles.iconContainer}>
				<img className={styles.icon} src={icon.svg} />
			</a>
		</li>
	);
};

const Footer = () => {
	return (
		<footer className={styles.container}>
			<button className={styles.feedbackButton}>Обратная связь</button>
			<section className={styles.lineBlock}>
				<div className={styles.line} />
				<ul className={styles.about}>
					{icons.map((icon) => {
						return <URLIcon svg={icon.svg} title={icon.title} url={icon.url} key={icon.title} />;
					})}
				</ul>
				<div className={styles.line} />
			</section>
		</footer>
	);
};

export default Footer;
