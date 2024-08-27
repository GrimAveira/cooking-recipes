import { Controller, Get, Param, Res } from "@nestjs/common";
import { IngredientService } from "./ingredient.service";
import { Response } from "express";

@Controller("ingredient")
export class IngredientController {
	constructor(private readonly ingredientService: IngredientService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.ingredientService.getAll(res);
	}
	@Get(":recipeId")
	async getOfRecipe(@Res() res: Response, @Param("recipeId") recipeId: string) {
		return this.ingredientService.getOfRecipe(res, recipeId);
	}
}
