import { Controller, Get, Res } from "@nestjs/common";
import { ClassificationRecipeService } from "./classification-recipe.service";
import { Response } from "express";

@Controller("classification-recipe")
export class ClassificationRecipeController {
	constructor(private readonly classificationRecipeService: ClassificationRecipeService) {}
	@Get("/")
	async getOfRecipe(@Res() res: Response) {
		return this.classificationRecipeService.getAllWithRecipes(res);
	}
}
