import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresModule } from "nest-postgres";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./constants";
import { CryptModule } from './crypt/crypt.module';
import { RecipeModule } from './recipe/recipe.module';
import { ImageModule } from './image/image.module';

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
		CryptModule,
		RecipeModule,
		ImageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
