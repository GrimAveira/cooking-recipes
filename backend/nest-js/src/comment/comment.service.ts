import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { Comment } from "src/sentiment/dto/comment.dto";
import { CommentAdd } from "./dto/comment.dto";

@Injectable()
export class CommentService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getByRecipeId(@Res() res: Response, recipeId: string) {
		try {
			const comments = await this.pg.query(`SELECT * FROM public.comment_view WHERE recipe='${recipeId}'`);
			return res.status(200).send(comments.rows);
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async getUnhandled(): Promise<Comment[]> {
		try {
			const comments = await this.pg.query("SELECT * FROM public.comment WHERE sentiment='-2'");
			return comments.rows;
		} catch (error) {
			console.log(error);
		}
	}
	async updateComments(comments: Comment[]) {
		try {
			comments.forEach(async (comment) => {
				try {
					await this.pg.query(
						`UPDATE public.comment SET sentiment = '${comment.sentiment}'WHERE id = '${comment.id}';`,
					);
				} catch (error) {
					console.log(error);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}
	async add(res: Response, comment: CommentAdd) {
		try {
			const { recipe, description, user } = comment;
			await this.pg.query(
				`INSERT INTO comment (recipe, description, "user") VALUES ('${recipe}','${description}','${user}')`,
			);
			return res.status(200).send("Отзыв успешно добавлен");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
}
