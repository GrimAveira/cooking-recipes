import { Inject, Injectable } from "@nestjs/common";
// import { Cron, CronExpression } from "@nestjs/schedule";
import { CommentService } from "src/comment/comment.service";
import { RatingService } from "src/rating/rating.service";
import { Comment } from "src/sentiment/dto/comment.dto";
import { SentimentService } from "src/sentiment/sentiment.service";

@Injectable()
export class TasksService {
	constructor(
		@Inject(SentimentService) private readonly sentimentService: SentimentService,
		@Inject(CommentService) private readonly commentService: CommentService,
		@Inject(RatingService) private readonly ratingService: RatingService,
	) {}
	// @Cron(CronExpression.EVERY_30_SECONDS)
	async handleCron() {
		try {
			const comments = await this.commentService.getUnhandled();
			let calcComments: Comment[] = [];
			if (comments.length) calcComments = await this.sentimentService.calcSentiment(comments);
			this.commentService.updateComments(calcComments);
			this.ratingService.calcRating(calcComments);
		} catch (error) {
			console.log(error);
		}
	}
}
