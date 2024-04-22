import { Inject, Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { CryptService } from "src/crypt/crypt.service";

@Injectable()
export class UserService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(CryptService) private readonly cryptService: CryptService,
	) {}
	async getAll(@Res() res: Response, login: string) {
		try {
			const data = await this.pg.query(`SELECT * FROM public.user WHERE login = '${login}'`);
			return res.status(200).json(data.rows[0]);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async updateData(
		@Res() res: Response,
		{ login, firstName, secondName }: { login: string; firstName: string; secondName: string },
	) {
		try {
			await this.pg.query(
				`UPDATE public.user SET first_name = '${firstName}', second_name = '${secondName}' WHERE login = '${login}'`,
			);
			return res.status(200).send("Данные успешно обновлены");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async updatePassword(
		@Res() res: Response,
		{
			login,
			oldPassword,
			newPassword,
		}: {
			oldPassword: string;
			newPassword: string;
			login: string;
		},
	) {
		try {
			const user = await this.pg.query(`SELECT password FROM public.user WHERE login='${login}'`).catch((error) => {
				throw error;
			});
			const correctPassword = this.cryptService.validate(oldPassword, user.rows[0].password);
			if (!correctPassword) return res.status(400).send("Введён неверный пароль");
			const newHashPassword = this.cryptService.hash(newPassword);
			await this.pg.query(`UPDATE public.user SET password = '${newHashPassword}' WHERE login = '${login}'`);
			return res.status(200).json("Пароль успешно обновлён");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
