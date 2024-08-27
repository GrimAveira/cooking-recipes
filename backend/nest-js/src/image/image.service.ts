import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { PATH } from "src/constants";

@Injectable()
export class ImageService {
	async getImage(@Res() res: Response, filename: string) {
		try {
			res.sendFile(`${PATH}/${filename}`);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
