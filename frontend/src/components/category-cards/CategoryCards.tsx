import styles from "./CategoryCards.module.scss";
import { categoryCards } from "../../constants";
import CategoryCard from "../category-card/CategoryCard";
import { ICategoryCard } from "../../interfaces/index";

const CategoryCards = () => {
  return (
    <main>
      <ul className={styles.container}>
        {categoryCards.map((card: ICategoryCard) => {
          return <CategoryCard key={card.url} {...card} />;
        })}
      </ul>
    </main>
  );
};

export default CategoryCards;
