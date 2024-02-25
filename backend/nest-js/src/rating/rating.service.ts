import { Inject, Injectable } from "@nestjs/common";
import { RecipeService } from "src/recipe/recipe.service";
import { Comment } from "src/sentiment/dto/comment.dto";

@Injectable()
export class RatingService {
	constructor(@Inject(RecipeService) private readonly recipeService: RecipeService) {}
	async calcRating(comments: Comment[]) {
		try {
			const filteredComments = comments.reduce((accum, curr) => {
				if (accum[curr.recipe]) {
					if ((curr.sentiment = 1)) return { ...accum, [curr.recipe]: accum[curr.recipe] + 3 };
					else return { ...accum, [curr.recipe]: accum[curr.recipe] - 3 };
				} else {
					if ((curr.sentiment = 1)) return { ...accum, [curr.recipe]: 3 };
					else return { ...accum, [curr.recipe]: -3 };
				}
			}, {});
			console.log(filteredComments);
			this.recipeService.updateRating(filteredComments);
		} catch (error) {
			console.log(error);
		}
	}
}
