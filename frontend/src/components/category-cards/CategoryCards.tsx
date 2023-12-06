import React from "react";
import styles from "./CategoryCards.module.scss";
import { categoryCards } from "../../constants";
import CategoryCard from "../category-card/CategoryCard";
import { ICategoryCard } from "../../interfaces";

const CategoryCards = () => {
  return (
    <ul className={styles.container}>
      {categoryCards.map((card: ICategoryCard) => {
        return <CategoryCard key={card.url} img={card.img} url={card.url} />;
      })}
    </ul>
  );
};

export default CategoryCards;
