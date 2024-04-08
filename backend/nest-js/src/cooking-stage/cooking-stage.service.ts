import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class CookingStageService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getByRecipeId(@Res() res: Response, recipeId: string) {
		try {
			const comments = await this.pg.query(`SELECT * FROM public.list_of_cooking_stages WHERE recipe='${recipeId}'`);
			return res.status(200).send(comments.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
