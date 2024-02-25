import { Module } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RecipeModule } from "src/recipe/recipe.module";

@Module({
	providers: [RatingService],
	imports: [RecipeModule],
	exports: [RatingService],
})
export class RatingModule {}
