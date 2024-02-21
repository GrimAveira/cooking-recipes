import { useEffect, useState } from "react";
import RecipeOptions from "../recipe-options/RecipeOptions";
import styles from "./RecipeCards.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { IRecipe } from "../../interfaces";

function sortByOption(array: IRecipe[], sortOption: options) {
	if (sortOption === "popular") array.sort((a, b) => b.rating - a.rating);
	else if (sortOption === "recently")
		array.sort((a, b) => new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime());
	return array;
}

export type options = "popular" | "recently";

const RecipeCards = (props: { type?: string; subtype?: string; recipes: IRecipe[] }) => {
	const { recipes } = props;

	const [sortOption, setSortOption] = useState<options>("popular");
	const [sortedRecipes, setSortedRecipes] = useState<IRecipe[]>([]);

	useEffect(() => {
		setSortedRecipes(sortByOption(recipes, sortOption));
	}, [recipes, sortOption]);

	return (
		<>
			<p className={styles.recipeCount}>{`Всего найдено рецептов: ${recipes?.length}`}</p>
			<RecipeOptions setFilter={setSortOption} />
			<div className={styles.divLine} />
			<div className={styles.containerCards}>
				{sortedRecipes?.map((recipe) => {
					return <RecipeCard key={recipe.id} {...recipe} />;
				})}
			</div>
		</>
	);
};

export default RecipeCards;
