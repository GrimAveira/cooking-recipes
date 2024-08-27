import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { GetByUserDTO } from "./dto/getByUser.dto";
import { Response } from "express";
import { ChangeByUserDTO } from "./dto/changeByUser.dto";

@Controller("bookmark")
export class BookmarkController {
	constructor(private readonly bookmarkService: BookmarkService) {}

	@Post("getByRecipe")
	async getByRecipe(@Res() res: Response, @Body() DTO: GetByUserDTO) {
		return this.bookmarkService.getByRecipe(res, DTO);
	}
	@Get(":login")
	async getByUser(@Res() res: Response, @Param("login") login: string) {
		return this.bookmarkService.getByUser(res, login);
	}
	@Post("changeByUser")
	async change(@Res() res: Response, @Body() DTO: ChangeByUserDTO) {
		return this.bookmarkService.changeByUser(res, DTO);
	}
}
