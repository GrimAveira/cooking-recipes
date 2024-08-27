import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Response } from "express";
import { PayloadRecipeAdd } from "./dto/recipe.dto";

@Controller("recipe")
export class RecipeController {
	constructor(private readonly recipeService: RecipeService) {}
	@Get("getAll")
	async getAll(@Res() res: Response) {
		return this.recipeService.getAllRecipe(res);
	}
	@Post("add")
	async add(@Res() res: Response, @Body() DTO: PayloadRecipeAdd) {
		return this.recipeService.add(res, DTO);
	}
}
