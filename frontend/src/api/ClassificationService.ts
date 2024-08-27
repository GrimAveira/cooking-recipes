import axios from "axios";
import { IClassification } from "../interfaces";
import { hostIp } from "../constants";

export default class ClassificationService {
	static async getAll() {
		try {
			const response = await axios.get<IClassification[]>(
				`http://${hostIp}:3000/api/classification-recipe/`,
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
