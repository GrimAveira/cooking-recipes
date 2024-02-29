import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

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
}
