import { useEffect, useState } from "react";
import RecipeOptions from "../recipe-options/RecipeOptions";
import styles from "./RecipeCards.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { useQuery } from "react-query";
import RecipeService from "../../api/RecipeService";
import { TYPES_TRANSLATE } from "../../constants";
import { IRecipe } from "../../interfaces";

const filterRecipe = (array: IRecipe[], type: string, subtype?: string) => {
	let filteredArray = [...array];
	if (subtype && TYPES_TRANSLATE.get(subtype)) {
		filteredArray = filteredArray.filter(
			(recipe) => recipe.subtype === TYPES_TRANSLATE.get(subtype),
		);
	} else if (type && TYPES_TRANSLATE.get(type)) {
		filteredArray = filteredArray.filter((recipe) => recipe.type === TYPES_TRANSLATE.get(type));
	}
	return filteredArray;
};

function sortByOption(array: IRecipe[], filter: options) {
	if (filter === "popular") array.sort((a, b) => b.rating - a.rating);
	else if (filter === "recently")
		array.sort((a, b) => new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime());
	return array;
}

export type options = "popular" | "recently";

const RecipesWrapper = (props: { type?: string; subtype?: string }) => {
	const { type, subtype } = props;

	const [filter, setFilter] = useState<options>("popular");
	const [handledRecipes, setHandledRecipes] = useState<IRecipe[]>([]);

	const { isPending, error, data } = useQuery({
		queryKey: ["recipes"],
		queryFn: () => {
			return RecipeService.getAll();
		},
	});

	useEffect(() => {
		if (data && type) {
			setHandledRecipes(sortByOption(filterRecipe(data, type, subtype), filter));
		}
	}, [data, subtype, type, filter]);

	return (
		<>
			<p className={styles.recipeCount}>{`Всего найдено рецептов: ${handledRecipes.length}`}</p>
			<RecipeOptions setFilter={setFilter} />
			<div className={styles.divLine} />
			<div className={styles.containerCards}>
				{handledRecipes?.map((recipe) => {
					return <RecipeCard key={recipe.id} {...recipe} />;
				})}
			</div>
		</>
	);
};

export default RecipesWrapper;
