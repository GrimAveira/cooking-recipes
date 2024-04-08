import { Body, Controller, Post, Res } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { GetByUserDTO } from "./dto/getByUser.dto";
import { Response } from "express";
import { ChangeByUserDTO } from "./dto/changeByUser.dto";

@Controller("bookmark")
export class BookmarkController {
	constructor(private readonly bookmarkService: BookmarkService) {}

	@Post("getByUser")
	async registration(@Res() res: Response, @Body() DTO: GetByUserDTO) {
		return this.bookmarkService.getByUser(res, DTO);
	}
	@Post("changeByUser")
	async change(@Res() res: Response, @Body() DTO: ChangeByUserDTO) {
		return this.bookmarkService.changeByUser(res, DTO);
	}
}
