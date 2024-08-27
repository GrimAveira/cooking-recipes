import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Comment } from "./dto/comment.dto";

@Injectable()
export class SentimentService {
	async calcSentiment(comments: Comment[]) {
		try {
			const calcComments = await axios.get<Comment[]>("http://127.0.0.1:8000", { data: comments });
			return calcComments.data;
		} catch (error) {
			console.log(error);
		}
	}
}
