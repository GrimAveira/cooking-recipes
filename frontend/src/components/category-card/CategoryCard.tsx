import { ICategoryCard } from "../../interfaces";
import styles from "./CategoryCard.module.scss";

const CategoryCard = ({ img, url, title }: ICategoryCard) => {
  return (
    <li className={styles.container} style={{ backgroundImage: `url(${img})` }}>
      <p className={styles.p}>{title}</p>
      <a className={styles.a} href={url}>
        ПЕРЕЙТИ
      </a>
    </li>
  );
};

export default CategoryCard;
