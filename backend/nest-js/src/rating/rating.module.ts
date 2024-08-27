import { Module } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RecipeModule } from "src/recipe/recipe.module";
import { LikeModule } from "src/like/like.module";
import { BookmarkModule } from "src/bookmark/bookmark.module";
import { TemporarilyScoringModule } from "src/temporarily_scoring/temporarily_scoring.module";

@Module({
	providers: [RatingService],
	imports: [RecipeModule, LikeModule, BookmarkModule, TemporarilyScoringModule],
	exports: [RatingService],
})
export class RatingModule {}
