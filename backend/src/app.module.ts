import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresModule } from "nest-postgres";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./constants";
import { CryptModule } from "./crypt/crypt.module";
import { RecipeModule } from "./recipe/recipe.module";
import { ImageModule } from "./image/image.module";
import { IngredientModule } from "./ingredient/ingredient.module";
import { IngredientController } from "./ingredient/ingredient.controller";
import { LoggerMiddleware } from "./middleware/isAuth.middleware";
import { RecipeController } from "./recipe/recipe.controller";
import { CommentModule } from "./comment/comment.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [
		ScheduleModule.forRoot(),
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
		IngredientModule,
		CommentModule,
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(RecipeController, IngredientController);
	}
}
