import { Controller, Get, Res } from "@nestjs/common";
import { SubtypeService } from "./subtype.service";
import { Response } from "express";

@Controller("subtype")
export class SubtypeController {
	constructor(private readonly subtypeService: SubtypeService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.subtypeService.getAll(res);
	}
}
