import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresModule } from "nest-postgres";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./constants";

@Module({
	imports: [
		ConfigModule.forRoot(),
		PostgresModule.forRootAsync({
			useFactory: () => ({
				host: "localhost",
				database: DATABASE_NAME,
				password: DATABASE_PASSWORD,
				user: DATABASE_USER,
				port: DATABASE_PORT,
			}),
		}),
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
