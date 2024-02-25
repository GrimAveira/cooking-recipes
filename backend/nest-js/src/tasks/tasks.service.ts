import { Inject, Injectable } from "@nestjs/common";
// import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { CommentService } from "src/comment/comment.service";
import { RatingService } from "src/rating/rating.service";
import { SentimentService } from "src/sentiment/sentiment.service";

@Injectable()
export class TasksService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(SentimentService) private readonly sentimentService: SentimentService,
		@Inject(CommentService) private readonly commentService: CommentService,
		@Inject(RatingService) private readonly ratingService: RatingService,
	) {}
	// @Cron(CronExpression.EVERY_10_MINUTES)
	async handleCron() {
		try {
			const comments = await this.commentService.getUnhandled();
			const calcComments = await this.sentimentService.calcSentiment(comments);
			this.commentService.updateComments(calcComments);
			this.ratingService.calcRating(calcComments);
		} catch (error) {
			console.log(error);
		}
	}
}
