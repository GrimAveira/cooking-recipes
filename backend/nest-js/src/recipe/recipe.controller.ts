import { Controller, Get, Res } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Response } from "express";

@Controller("recipe")
export class RecipeController {
	constructor(private readonly recipeService: RecipeService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.recipeService.getAllRecipe(res);
	}
}
