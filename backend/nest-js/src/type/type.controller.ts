import { Controller, Get, Res } from "@nestjs/common";
import { TypeService } from "./type.service";
import { Response } from "express";

@Controller("type")
export class TypeController {
	constructor(private readonly typeService: TypeService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.typeService.getAll(res);
	}
}
