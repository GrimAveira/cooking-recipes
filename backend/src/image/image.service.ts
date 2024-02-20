import { Injectable, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class ImageService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getImage(@Res() res: Response, @Param("filename") filename: string) {
		try {
			res.sendFile(`C:/cooking-recipes-images/${filename}`);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
