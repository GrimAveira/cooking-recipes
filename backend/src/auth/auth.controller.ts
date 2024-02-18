import { Body, Controller, Delete, Post, Req, Res } from "@nestjs/common";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authSerice: AuthService) {}

	@Post("registration")
	async registration(@Res() res: Response, @Body() DTO: RegistrationDTO) {
		return this.authSerice.registration(res, DTO);
	}
	@Post("login")
	async login(@Req() req: Request, @Res() res: Response, @Body() DTO: LoginDTO) {
		return this.authSerice.login(req, res, DTO);
	}
	@Delete("logout")
	async logout(@Req() req: Request, @Res() res: Response) {
		return this.authSerice.logout(req, res);
	}
}
