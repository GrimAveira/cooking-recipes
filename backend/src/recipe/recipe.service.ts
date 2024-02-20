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
}
