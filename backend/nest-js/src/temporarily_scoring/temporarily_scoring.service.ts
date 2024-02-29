import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class TemporarilyScoringService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll() {
		try {
			const data = await this.pg.query<{ recipe: number; likes_number: number; bookmarks_number: number }>(
				`SELECT * FROM list_of_temporarily_scoring`,
			);
			return data.rows;
		} catch (error) {
			console.log(error);
		}
	}
	async updateAllLikes(likes: { recipe: number; count: number }[]) {
		try {
			likes.forEach((item) =>
				this.pg.query(
					`UPDATE list_of_temporarily_scoring SET likes_number = '${item.count}' WHERE recipe = '${item.recipe}'`,
				),
			);
		} catch (error) {
			console.log(error);
		}
	}
	async updateAllBookmarks(bookmarks: { recipe: number; count: number }[]) {
		try {
			bookmarks.forEach((item) =>
				this.pg.query(
					`UPDATE list_of_temporarily_scoring SET bookmarks_number = '${item.count}' WHERE recipe = '${item.recipe}'`,
				),
			);
		} catch (error) {
			console.log(error);
		}
	}
}
