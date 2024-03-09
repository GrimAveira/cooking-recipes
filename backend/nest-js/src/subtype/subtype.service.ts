import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class SubtypeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll(@Res() res: Response) {
		try {
			const data = await this.pg.query<{ recipe: number; likes_number: number; bookmarks_number: number }>(
				`SELECT * FROM subtype_recipe`,
			);
			return res.status(200).json(data.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
