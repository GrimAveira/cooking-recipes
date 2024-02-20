import { useEffect, useState } from "react";
import RecipeOptions from "../recipe-options/RecipeOptions";
import styles from "./RecipeCards.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { useQuery } from "react-query";
import RecipeService from "../../api/RecipeService";
import { TYPES_TRANSLATE } from "../../constants";
import { IRecipe } from "../../interfaces";

const filterRecipe = (array: IRecipe[], type: string, subtype?: string) => {
	console.log("join", type, subtype, TYPES_TRANSLATE.get(type));
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

const RecipesWrapper = (props: { type?: string; subtype?: string }) => {
	const { type, subtype } = props;

	const [filter, setFilter] = useState("popular");

	const [handledRecipes, setHandledRecipes] = useState<IRecipe[]>([]);

	const { isPending, error, data } = useQuery({
		queryKey: ["recipes"],
		queryFn: () => {
			return RecipeService.getAll();
		},
	});

	useEffect(() => {
		if (data && type) setHandledRecipes(filterRecipe(data, type, subtype));
	}, [data, subtype, type]);

	// type options = "popular" | "recently";

	// function sortByOption(array: Array<string>, option: options) {
	// 	return array.filter((elem) => elem === option);
	// }

	return (
		<>
			<p className={styles.recipeCount}>{`Всего найдено рецептов: ${223}`}</p>
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
