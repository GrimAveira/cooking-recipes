import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptService {
	validate() {}
	hash(password: string) {
		const salt = bcrypt.genSaltSync(7);
		return bcrypt.hashSync(password, salt);
	}
}
