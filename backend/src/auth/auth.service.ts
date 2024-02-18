import { Client } from "pg";
import { Inject, Injectable, Req, Res } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Request, Response } from "express";
import { CryptService } from "src/crypt/crypt.service";
import { randomUUID } from "crypto";

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
	async login(@Req() req: Request, @Res() res: Response, DTO: LoginDTO) {
		try {
			const user = await this.pg.query(`SELECT * FROM public.user WHERE login='${DTO.login}'`).catch((error) => {
				throw error;
			});
			if (!user.rowCount) return res.status(400).send("Пользователя с введённым логином не существует");
			const correctPassword = this.cryptService.validate(DTO.password, user.rows[0].password);
			if (!correctPassword) return res.status(400).send("Введён неверный пароль");
			const sessionID = randomUUID();
			await this.pg.query(`INSERT INTO public.session (hash) VALUES ('${sessionID}')`).catch((error) => {
				throw error;
			});
			return res.status(200).cookie("session", sessionID, { httpOnly: true }).send("Успешная аутентификация");
		} catch (error) {
			console.error(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async logout(@Req() req: Request, @Res() res: Response) {
		try {
			const sessionId = req.headers.cookie?.split("=")[1];
			console.log(sessionId);
			await this.pg.query(`DELETE FROM public.session WHERE hash='${sessionId}'`).catch((error) => {
				throw error;
			});
			res.clearCookie("session");
			return res.status(200).send("Успешный выход");
		} catch (error) {
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
