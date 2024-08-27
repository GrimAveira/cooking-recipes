import axios from "axios";
import { ICookingStage, IIngredient, IRecipe, IRecipeFetch } from "../interfaces";
import { hostIp } from "../constants";
import ImageService from "./ImageService";

export default class RecipeService {
	static async getAll() {
		try {
			const response = await axios.get<IRecipeFetch[]>(`http://${hostIp}:3000/api/recipe/getAll`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async add(payload: {
		image: FormData;
		recipe: IRecipe;
		cookingStages: ICookingStage[];
		ingredients: IIngredient[];
	}) {
		try {
			const imageName = await ImageService.upload(payload.image);
			const response = await axios.post(`http://${hostIp}:3000/api/recipe/add`, {
				image: imageName,
				recipe: payload.recipe,
				cookingStages: payload.cookingStages,
				ingredients: payload.ingredients,
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
