import { Module } from "@nestjs/common";
import { ClassificationRecipeService } from "./classification-recipe.service";
import { ClassificationRecipeController } from "./classification-recipe.controller";

@Module({
	providers: [ClassificationRecipeService],
	controllers: [ClassificationRecipeController],
	exports: [ClassificationRecipeService],
})
export class ClassificationRecipeModule {}
