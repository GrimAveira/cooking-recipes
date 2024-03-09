import { Controller, Get, Res } from "@nestjs/common";
import { KitchenService } from "./kitchen.service";
import { Response } from "express";

@Controller("kitchen")
export class KitchenController {
	constructor(private readonly kitchenService: KitchenService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.kitchenService.getAll(res);
	}
}
