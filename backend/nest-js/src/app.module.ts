import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostgresModule } from "nest-postgres";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, DB_HOST, PATH } from "./constants";
import { CryptModule } from "./crypt/crypt.module";
import { RecipeModule } from "./recipe/recipe.module";
import { ImageModule } from "./image/image.module";
import { IngredientModule } from "./ingredient/ingredient.module";
import { IngredientController } from "./ingredient/ingredient.controller";
import { LoggerMiddleware } from "./middleware/isAuth.middleware";
import { RecipeController } from "./recipe/recipe.controller";
import { CommentModule } from "./comment/comment.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./tasks/tasks.module";
import { SentimentModule } from "./sentiment/sentiment.module";
import { RatingModule } from "./rating/rating.module";
import { LikeModule } from "./like/like.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { TemporarilyScoringController } from "./temporarily_scoring/temporarily_scoring.controller";
import { TemporarilyScoringService } from "./temporarily_scoring/temporarily_scoring.service";
import { TemporarilyScoringModule } from "./temporarily_scoring/temporarily_scoring.module";
import { TypeModule } from "./type/type.module";
import { SubtypeModule } from "./subtype/subtype.module";
import { KitchenModule } from "./kitchen/kitchen.module";
import { ClassificationRecipeModule } from "./classification-recipe/classification-recipe.module";
import { MulterModule } from "@nestjs/platform-express";
import { CookingStageModule } from './cooking-stage/cooking-stage.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		MulterModule.register({
			dest: PATH,
		}),
		ScheduleModule.forRoot(),
		ConfigModule.forRoot(),
		PostgresModule.forRootAsync({
			useFactory: () => ({
				host: DB_HOST,
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
		SentimentModule,
		RatingModule,
		LikeModule,
		BookmarkModule,
		TemporarilyScoringModule,
		TypeModule,
		SubtypeModule,
		KitchenModule,
		ClassificationRecipeModule,
		CookingStageModule,
		UserModule,
	],
	controllers: [AppController, TemporarilyScoringController],
	providers: [AppService, TemporarilyScoringService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes(RecipeController, IngredientController);
	}
}
