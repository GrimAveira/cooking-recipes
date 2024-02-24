import { Controller, Get, Param, Res } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Response } from "express";

@Controller("comment")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@Get(":recipeId")
	async getOfRecipe(@Res() res: Response, @Param("recipeId") recipeId: string) {
		return this.commentService.getByRecipeId(res, recipeId);
	}
}
