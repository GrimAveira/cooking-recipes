import { ICategoryCard } from "../../interfaces";
import styles from "./CategoryCard.module.scss";

const CategoryCard = ({ img, url }: ICategoryCard) => {
  console.log(img);
  return (
    <li className={styles.container} style={{ backgroundImage: `url(${img})` }}>
      <a className={styles.a} href={url}>
        ПЕРЕЙТИ
      </a>
    </li>
  );
};

export default CategoryCard;
