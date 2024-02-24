import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class IngredientService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll(@Res() res: Response) {
		try {
			const ingredients = await this.pg.query("SELECT * FROM public.ingredient");
			return res.status(200).send(ingredients.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async getOfRecipe(@Res() res: Response, recipeId: string) {
		try {
			const ingredients = await this.pg.query(`SELECT * FROM public.ingredients_view WHERE recipe='${recipeId}'`);
			return res.status(200).send(ingredients.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
