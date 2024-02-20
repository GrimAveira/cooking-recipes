import { Link } from "react-router-dom";
import styles from "./SubTypeCard.module.scss";

interface PropsI {
	img: string;
	title: string;
	url: string;
}

function SubTypeCard(props: PropsI) {
	const { img, title, url } = props;

	return (
		<Link to={url} className={styles.linkContainer}>
			<img className={styles.img} src={img} alt={title} />
			<p className={styles.p}>{title}</p>
		</Link>
	);
}

export default SubTypeCard;
