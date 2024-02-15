import { useParams } from "react-router-dom";
import styles from "./Recipes.module.scss";
import ShellWrapper from "../../hoc/ShellWrapper";
import MinorHeader from "../../components/minorHeader/MinorHeader";
import TypesBar from "../../components/typesBar/TypesBar";
import RecipeCards from "../../components/recipe-cards/RecipeCards";
import RecipeOptions from "../../components/recipe-options/RecipeOptions";
import { useEffect, useState } from "react";

const RecipesBase = () => {
	const { type, subtype } = useParams();
	const [filter, setFilter] = useState("popular");

	type options = "popular" | "recently";

	function sortByOption(array: Array<string>, option: options) {
		return array.filter((elem) => elem === option);
	}

	useEffect(() => {}, [filter]);

	return (
		<main>
			<MinorHeader type={subtype ? subtype : type} />
			<article className={styles.container}>
				{typeof subtype === "undefined" && <TypesBar className={styles.typesBar} type={type} />}
				<p className={styles.recipeCount}>{`Всего найдено рецептов: ${223}`}</p>
				<RecipeOptions setFilter={setFilter} />
				<div className={styles.divLine} />
				<RecipeCards />
			</article>
		</main>
	);
};
const Recipes = () => ShellWrapper(RecipesBase);
export default Recipes;
