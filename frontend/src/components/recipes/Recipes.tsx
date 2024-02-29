import { useQuery } from "react-query";
import RecipeService from "../../api/RecipeService";
import RecipeCards from "../recipe-cards/RecipeCards";
import Recipe from "../recipe/Recipe";
import { useEffect, useState } from "react";
import { IRecipeFetch } from "../../interfaces";
import { TYPES_TRANSLATE_ENG_RU } from "../../constants";

const filterRecipe = (array: IRecipeFetch[], type: string, subtype?: string) => {
	let filteredArray = [...array];
	if (subtype && TYPES_TRANSLATE_ENG_RU.get(subtype)) {
		filteredArray = filteredArray.filter(
			(recipe) => recipe.subtype === TYPES_TRANSLATE_ENG_RU.get(subtype),
		);
	} else if (type && TYPES_TRANSLATE_ENG_RU.get(type)) {
		filteredArray = filteredArray.filter(
			(recipe) => recipe.type === TYPES_TRANSLATE_ENG_RU.get(type),
		);
	}
	return filteredArray;
};

const Recipes = (props: { id?: string; type?: string; subtype?: string }) => {
	const { id, type, subtype } = props;

	const [filteredRecipes, setFilteredRecipes] = useState<IRecipeFetch[]>([]);

	const { isPending, error, data } = useQuery({
		queryKey: ["recipes"],
		queryFn: () => {
			return RecipeService.getAll();
		},
	});

	useEffect(() => {
		if (data && type) {
			setFilteredRecipes(filterRecipe(data, type, subtype));
		}
	}, [data, subtype, type]);

	return (
		<>
			{id ? (
				<Recipe recipes={filteredRecipes} id={id} />
			) : (
				<RecipeCards type={type} subtype={subtype} recipes={filteredRecipes} />
			)}
		</>
	);
};

export default Recipes;
