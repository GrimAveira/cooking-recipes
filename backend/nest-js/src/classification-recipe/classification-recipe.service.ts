import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class ClassificationRecipeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAllWithRecipes(res: Response) {
		try {
			const classifications = await this.pg.query(`SELECT * FROM classification_recipe`);
			return res.status(200).json(classifications.rows);
		} catch (error) {
			console.log(error);
		}
	}
	//view для recipe удалить, думаю
	async getId(type: string, subtype: string) {
		try {
			const classification = await this.pg.query(
				`SELECT id FROM classification_recipe WHERE type='${type}' and subtype='${subtype}'`,
			);
			return classification.rows[0].id;
		} catch (error) {
			console.log(error);
		}
	}
}
