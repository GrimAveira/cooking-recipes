import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Response } from "express";
import { CommentAdd } from "./dto/comment.dto";

@Controller("comment")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@Get(":recipeId")
	async getOfRecipe(@Res() res: Response, @Param("recipeId") recipeId: string) {
		return this.commentService.getByRecipeId(res, recipeId);
	}
	@Post("add")
	async add(@Res() res: Response, @Body() comment: CommentAdd) {
		return this.commentService.add(res, comment);
	}
}
