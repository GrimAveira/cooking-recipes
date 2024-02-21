import { useEffect, useState } from "react";
import { IRecipe } from "../../interfaces";
import styles from "./Recipe.module.scss";

const Recipe = (props: { recipes: IRecipe[]; id: string }) => {
	const { recipes, id } = props;

	const [recipe, setRecipe] = useState<IRecipe>();

	useEffect(() => {
		setRecipe(recipes.find((recipe) => recipe.id.toString() === id));
	}, [recipes, id]);

	return (
		<div className={styles.container}>
			<p>{recipe?.title}</p>
		</div>
	);
};

export default Recipe;
