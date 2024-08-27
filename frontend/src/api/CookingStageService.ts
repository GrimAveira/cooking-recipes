import axios from "axios";
import { ICookingStageFetch } from "../interfaces";
import { hostIp } from "../constants";

export default class CookingStageService {
	static async getByRecipe(recipeId: string) {
		try {
			const response = await axios.get<ICookingStageFetch[]>(
				`http://${hostIp}:3000/api/cookingStage/${recipeId}`,
			);
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
