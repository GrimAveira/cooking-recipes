import axios from "axios";
import { IRecipe } from "../interfaces";

export default class RecipeService {
	static async getAll() {
		try {
			const response = await axios.get<IRecipe[]>("http://192.168.0.106:3000/api/recipe/getAll");
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
