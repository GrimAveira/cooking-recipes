import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class SubtypeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll() {
		try {
			const data = await this.pg.query(`SELECT * FROM subtype_recipe`);
			return data.rows;
		} catch (error) {
			console.log(error);
			return new Error(error);
		}
	}
}
