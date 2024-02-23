import axios from "axios";
import { IData, IIngredients } from "../interfaces";
import { hostIp } from "../constants";

export default class IngredientService {
	static async getAll() {
		try {
			const response = await axios.get<IData[]>(`http://${hostIp}:3000/api/ingredient/getAll`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async getByRecipe(recipeId: string) {
		try {
			const response = await axios.get<IIngredients[]>(
				`http://${hostIp}:3000/api/ingredient/${recipeId}`,
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
