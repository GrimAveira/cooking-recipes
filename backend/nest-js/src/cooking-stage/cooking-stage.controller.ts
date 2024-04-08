import { Controller, Get, Param, Res } from "@nestjs/common";
import { CookingStageService } from "./cooking-stage.service";
import { Response } from "express";

@Controller("cookingStage")
export class CookingStageController {
	constructor(private readonly cookingStageService: CookingStageService) {}
	@Get(":recipeId")
	async getOfRecipe(@Res() res: Response, @Param("recipeId") recipeId: string) {
		return this.cookingStageService.getByRecipeId(res, recipeId);
	}
}
