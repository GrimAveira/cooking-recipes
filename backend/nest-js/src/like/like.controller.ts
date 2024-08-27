import { Body, Controller, Post, Res } from "@nestjs/common";
import { LikeService } from "./like.service";
import { Response } from "express";
import { GetByUserDTO } from "./dto/getByUser.dto";
import { ChangeByUserDTO } from "./dto/changeByUser.dto";

@Controller("like")
export class LikeController {
	constructor(private readonly likeService: LikeService) {}
	@Post("getByUser")
	async registration(@Res() res: Response, @Body() DTO: GetByUserDTO) {
		return this.likeService.getByUser(res, DTO);
	}
	@Post("changeByUser")
	async change(@Res() res: Response, @Body() DTO: ChangeByUserDTO) {
		return this.likeService.changeByUser(res, DTO);
	}
}
