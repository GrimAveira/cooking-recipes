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
			const bookmarks = await this.pg.query<{ recipe: number; count: number }>(
				`SELECT recipe, COUNT(recipe) as count FROM list_of_bookmarks GROUP BY recipe`,
			);
			return bookmarks.rows;
		} catch (error) {
			console.log(error);
		}
	}
	async getByUser(res: Response, DTO: GetByUserDTO) {
		try {
			const bookmarks = await this.pg.query(
				`SELECT * FROM list_of_bookmarks WHERE "user"='${DTO.login}' and recipe='${DTO.recipeID}'`,
			);
			return res.status(200).json(bookmarks.rowCount);
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
