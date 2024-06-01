import { Controller, Get, Res } from "@nestjs/common";
import { SubtypeService } from "./subtype.service";
import { Response } from "express";

@Controller("subtype")
export class SubtypeController {
	constructor(private readonly subtypeService: SubtypeService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		const data = await this.subtypeService.getAll();
		return res.status(200).json(data);
	}
}
