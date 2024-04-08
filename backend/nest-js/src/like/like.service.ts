import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { GetByUserDTO } from "./dto/getByUser.dto";
import { Response } from "express";
import { ChangeByUserDTO } from "./dto/changeByUser.dto";

@Injectable()
export class LikeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAllWithRecipes() {
		try {
			const likes = await this.pg.query<{ recipe: number; count: number }>(
				`SELECT recipe, COUNT(recipe) as count FROM list_of_likes GROUP BY recipe`,
			);
			return likes.rows;
		} catch (error) {
			console.log(error);
		}
	}
	async getByUser(res: Response, DTO: GetByUserDTO) {
		try {
			const likes = await this.pg.query(
				`SELECT * FROM list_of_likes WHERE "user"='${DTO.login}' and recipe='${DTO.recipeID}'`,
			);
			return res.status(200).json(likes.rowCount);
		} catch (error) {
			console.log(error);
		}
	}
	async changeByUser(res: Response, DTO: ChangeByUserDTO) {
		try {
			if (DTO.flag)
				await this.pg.query(`INSERT INTO list_of_likes (recipe, "user") VALUES ('${DTO.recipeID}', '${DTO.login}')`);
			else await this.pg.query(`DELETE FROM list_of_likes WHERE "user"='${DTO.login}' and recipe='${DTO.recipeID}'`);

			return res.status(200).send("Лайк успешно изменён");
		} catch (error) {
			console.log(error);
		}
	}
}
