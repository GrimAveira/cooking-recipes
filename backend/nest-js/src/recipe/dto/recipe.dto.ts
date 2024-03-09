export class RecipeFetch {
	id: number;
	title: string;
	description: string;
	creation_date: string;
	total_cooking_time: string;
	active_cooking_time: string;
	complexity: string;
	storage_time: string;
	sevings_number: number;
	calories_number: number;
	score_number: number;
	rating: number;
	image_path: string;
	first_name: string;
	second_name: string;
	kitchen: string;
	type: string;
	subtype: string;
}
export class IngredientAdd {
	ingredientId: number;
	ingredient: string;
	notation: string;
	quantity: string;
}
export class CookingStageAdd {
	stageId: number;
	stageTitle: string;
	description: string;
}
export class RecipeAdd {
	login: string;
	title: string;
	description: string;
	total_cooking_time: string;
	active_cooking_time: string;
	complexity: string;
	storage_time: string;
	servings_number: string;
	calories_number: string;
	image: FormData;
	kitchen: string;
	type: string;
	subtype: string;
}
export class PayloadRecipeAdd {
	image: string;
	recipe: RecipeAdd;
	cookingStages: CookingStageAdd[];
	ingredients: IngredientAdd[];
}
