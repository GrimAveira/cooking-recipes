import { Inject, Injectable } from "@nestjs/common";
import { BookmarkService } from "src/bookmark/bookmark.service";
import { LikeService } from "src/like/like.service";
import { RecipeService } from "src/recipe/recipe.service";
import { Comment } from "src/sentiment/dto/comment.dto";
import { TemporarilyScoringService } from "src/temporarily_scoring/temporarily_scoring.service";

@Injectable()
export class RatingService {
	constructor(
		@Inject(RecipeService) private readonly recipeService: RecipeService,
		@Inject(LikeService) private readonly likeService: LikeService,
		@Inject(BookmarkService) private readonly bookmarkService: BookmarkService,
		@Inject(TemporarilyScoringService) private readonly temporarilyScoringService: TemporarilyScoringService,
	) {}
	async calcRating(comments: Comment[]) {
		try {
			const filteredComments: { [key: string]: number } = comments.reduce((accum, curr) => {
				if (accum[curr.recipe]) {
					if ((curr.sentiment = 1)) return { ...accum, [curr.recipe]: accum[curr.recipe] + 3 };
					if ((curr.sentiment = -1)) return { ...accum, [curr.recipe]: accum[curr.recipe] - 3 };
					return { ...accum, [curr.recipe]: accum[curr.recipe] };
				} else {
					if ((curr.sentiment = 1)) return { ...accum, [curr.recipe]: 3 };
					if ((curr.sentiment = -1)) return { ...accum, [curr.recipe]: -3 };
					return { ...accum, [curr.recipe]: 0 };
				}
			}, {});
			const [likesCurrent, bookmarksCurrent, temporarilyData] = await Promise.all([
				this.likeService.getAllWithRecipes(),
				this.bookmarkService.getAllWithRecipes(),
				this.temporarilyScoringService.getAll(),
			]);
			console.log(likesCurrent, bookmarksCurrent, temporarilyData);
			likesCurrent.forEach((like) => {
				const temporarilyRecipe = temporarilyData.find((recipe) => recipe.recipe === like.id);
				if (filteredComments[like.id]) filteredComments[like.id] += like.count - temporarilyRecipe.likes_number;
				else filteredComments[like.id] = like.count - temporarilyRecipe.likes_number;
			});
			bookmarksCurrent.forEach((bookmark) => {
				const temporarilyRecipe = temporarilyData.find((recipe) => recipe.recipe === bookmark.id);
				if (filteredComments[bookmark.id])
					filteredComments[bookmark.id] += (bookmark.count - temporarilyRecipe.bookmarks_number) * 2;
				else filteredComments[bookmark.id] = (bookmark.count - temporarilyRecipe.bookmarks_number) * 2;
			});
			this.recipeService.updateRating(filteredComments);
			await this.temporarilyScoringService.updateAllBookmarks(bookmarksCurrent);
			await this.temporarilyScoringService.updateAllLikes(likesCurrent);
		} catch (error) {
			console.log(error);
		}
	}
}
