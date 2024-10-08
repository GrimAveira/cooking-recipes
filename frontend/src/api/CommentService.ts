import axios from "axios";
import { IComment, ICommentAdd } from "../interfaces";
import { hostIp } from "../constants";

export default class CommentService {
	static async getByRecipeId(recipeId: string) {
		try {
			const response = await axios.get<IComment[]>(`http://${hostIp}:3000/api/comment/${recipeId}`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async add(comment: ICommentAdd) {
		try {
			console.log(comment);
			const response = await axios.post(`http://${hostIp}:3000/api/comment/add`, comment, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
}
