import { Module } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { RecipeController } from "./recipe.controller";
import { ClassificationRecipeModule } from "src/classification-recipe/classification-recipe.module";

@Module({
	providers: [RecipeService],
	controllers: [RecipeController],
	exports: [RecipeService],
	imports: [ClassificationRecipeModule],
})
export class RecipeModule {}
