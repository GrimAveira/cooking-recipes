import { Inject, Injectable, Res } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { RecipeFetch, PayloadRecipeAdd } from "./dto/recipe.dto";
import { Response } from "express";
import { ClassificationRecipeService } from "src/classification-recipe/classification-recipe.service";

@Injectable()
export class RecipeService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(ClassificationRecipeService) private readonly classificationRecipeService: ClassificationRecipeService,
	) {}
	async getAllRecipe(@Res() res: Response) {
		try {
			const recipes = await this.pg.query<RecipeFetch[]>("SELECT * FROM public.recipe_view");
			return res.status(200).json(recipes.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async updateRating(comments: { [key: string]: number }) {
		try {
			for (const prop in comments) {
				const prevRating = await this.pg.query<{ rating: string }>(
					`SELECT rating FROM public.recipe WHERE id = '${prop}'`,
				);
				this.pg.query(
					`UPDATE public.recipe SET rating = '${Number(prevRating.rows[0].rating) + comments[prop]}' WHERE id = '${prop}'`,
				);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async add(@Res() res: Response, DTO: PayloadRecipeAdd) {
		try {
			const { recipe, image, cookingStages, ingredients } = DTO;
			const classificationId = await this.classificationRecipeService.getId(recipe.type, recipe.subtype);
			const date = new Date();
			const recipeId = (
				await this.pg.query(
					`INSERT INTO recipe (creation_date, "user", title, description, total_cooking_time, active_cooking_time, complexity, classification, kitchen, storage_time, servings_number, calories_number, image_path) VALUES ('${date.toLocaleString("ru")}','${recipe.login}','${recipe.title}','${recipe.description}','${recipe.total_cooking_time}','${recipe.active_cooking_time}','${DTO.recipe.complexity}','${classificationId}','${recipe.kitchen}','${recipe.storage_time}','${recipe.servings_number}','${recipe.calories_number}','${image}') RETURNING id`,
				)
			).rows[0].id;
			await this.pg.query(`INSERT INTO list_of_temporarily_scoring (recipe) VALUES ('${recipeId}')`);
			cookingStages.forEach(async (stage, index) => {
				await this.pg.query(
					`INSERT INTO list_of_cooking_stages (recipe, title, order_number, description) VALUES ('${recipeId}','${stage.stageTitle}', '${index + 1}', '${stage.description}')`,
				);
			});
			ingredients.forEach(async (ingredient) => {
				await this.pg.query(
					`INSERT INTO list_of_ingredient (recipe, ingredient, notation, quantity) VALUES ('${recipeId}','${ingredient.ingredient}', '${ingredient.notation}', '${ingredient.quantity}')`,
				);
			});
			return res.status(200).send("Рецепт успешно добавлен");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
