import { Client } from "pg";
import { Inject, Injectable, Res } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Response } from "express";
import { CryptService } from "src/crypt/crypt.service";

@Injectable()
export class AuthService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(CryptService) private readonly cryptService: CryptService,
	) {}
	async registration(@Res() res: Response, DTO: RegistrationDTO) {
		try {
			const user = await this.pg.query(`SELECT login FROM public.user WHERE login='${DTO.login}'`).catch((error) => {
				throw error;
			});
			if (user.rowCount) return res.status(400).send("Пользователь с введённым логином уже зарегистрирован");
			const hashPassword = this.cryptService.hash(DTO.password);
			await this.pg
				.query(
					`INSERT INTO public.user (login, email, first_name, second_name, password) VALUES ('${DTO.login}','${DTO.email}','${DTO.firstName}','${DTO.secondName}','${hashPassword}')`,
				)
				.catch((error) => {
					throw error;
				});
			return res.status(200).send("Пользователь успешно зарегистрирован");
		} catch (err) {
			console.log(err);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async login(@Res() res: Response, DTO: LoginDTO) {}
	async logout(@Res() res: Response, request: Request) {}
}
