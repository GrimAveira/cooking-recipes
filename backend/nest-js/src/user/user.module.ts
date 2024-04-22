import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CryptModule } from "src/crypt/crypt.module";

@Module({
	controllers: [UserController],
	imports: [CryptModule],
	providers: [UserService],
})
export class UserModule {}
