import { Injectable, Res } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { Recipe } from "./dto/recipe.dto";
import { Response } from "express";

@Injectable()
export class RecipeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAllRecipe(@Res() res: Response) {
		try {
			const recipes = await this.pg.query<Recipe[]>("SELECT * FROM public.recipe_view");
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
}
