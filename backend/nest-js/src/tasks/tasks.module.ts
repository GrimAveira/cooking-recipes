import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { SentimentModule } from "../sentiment/sentiment.module";
import { CommentModule } from "src/comment/comment.module";
import { RatingModule } from "../rating/rating.module";

@Module({
	providers: [TasksService],
	imports: [SentimentModule, CommentModule, RatingModule],
})
export class TasksModule {}
