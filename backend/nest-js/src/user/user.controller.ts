import { Body, Controller, Get, Param, Put, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get(":login")
	async getUserInfo(@Res() res: Response, @Param() params: { login: string }) {
		const users = this.userService.getUserInfo(params.login);
		return res.status(200).json(users);
	}
	@Put("updateData")
	async updateData(@Res() res: Response, @Body() payload: { login: string; firstName: string; secondName: string }) {
		return this.userService.updateData(res, payload);
	}
	@Put("updatePassword")
	async updatePassword(
		@Res() res: Response,
		@Body() payload: { login: string; oldPassword: string; newPassword: string },
	) {
		return this.userService.updatePassword(res, payload);
	}
}
