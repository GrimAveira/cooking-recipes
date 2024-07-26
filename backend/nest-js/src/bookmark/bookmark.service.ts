import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { GetByUserDTO } from "./dto/getByUser.dto";
import { ChangeByUserDTO } from "./dto/changeByUser.dto";

@Injectable()
export class BookmarkService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAllWithRecipes() {
		try {
			const bookmarks = await this.pg.query<{ id: number; count: number }>(
				`SELECT recipe as id, COUNT(recipe) as count FROM list_of_bookmarks GROUP BY recipe`,
			);
			const jsonBookmarks = bookmarks.rows;
			const allRecipes = await this.pg.query<{ id: number }>(`SELECT id FROM recipe`);
			allRecipes.rows.forEach(({ id }) => {
				if (jsonBookmarks.find((recipe) => recipe.id == id) == undefined) jsonBookmarks.push({ id: id, count: 0 });
			});
			return jsonBookmarks;
		} catch (error) {
			console.log(error);
		}
	}
	async getByRecipe(res: Response, DTO: GetByUserDTO) {
		try {
			const bookmarks = await this.pg.query(
				`SELECT * FROM list_of_bookmarks WHERE "user"='${DTO.login}' and recipe='${DTO.recipeID}'`,
			);
			return res.status(200).json(bookmarks.rowCount);
		} catch (error) {
			console.log(error);
		}
	}
	async getByUser(res: Response, login: string) {
		try {
			const bookmarks = await this.pg.query(`SELECT recipe FROM list_of_bookmarks WHERE "user"='${login}'`);
			return res.status(200).json(bookmarks.rows.map((obj) => obj.recipe));
		} catch (error) {
			console.log(error);
		}
	}
	async changeByUser(res: Response, DTO: ChangeByUserDTO) {
		try {
			if (DTO.flag)
				await this.pg.query(
					`INSERT INTO list_of_bookmarks (recipe, "user") VALUES ('${DTO.recipeID}', '${DTO.login}')`,
				);
			else
				await this.pg.query(`DELETE FROM list_of_bookmarks WHERE "user"='${DTO.login}' and recipe='${DTO.recipeID}'`);

			return res.status(200).send("Закладка успешно обновлена");
		} catch (error) {
			console.log(error);
		}
	}
}
