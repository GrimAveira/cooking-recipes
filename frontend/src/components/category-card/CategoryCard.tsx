import { Link } from "react-router-dom";
import { ICategoryCard } from "../../interfaces";
import styles from "./CategoryCard.module.scss";

const CategoryCard = ({ img, url, title }: ICategoryCard) => {
	return (
		<li className={styles.container}>
			<img src={img} alt={title} className={styles.img} />
			<p className={styles.p}>{title}</p>
			<Link className={styles.a} to={url}>
				ПЕРЕЙТИ
			</Link>
		</li>
	);
};

export default CategoryCard;
