import axios from "axios";
import { IChangeByUser, IGetUserInfo } from "../interfaces";
import { hostIp } from "../constants";

export default class BookmarkService {
	static async getByRecipe(payload: IGetUserInfo) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/bookmark/getByRecipe`, payload, {
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
	static async getByUser({ login }: { login: string }) {
		try {
			const response = await axios.get(`http://${hostIp}:3000/api/bookmark/${login}`, {
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
	static async changeByUser(payload: IChangeByUser) {
		try {
			const response = await axios.post(
				`http://${hostIp}:3000/api/bookmark/changeByUser`,
				payload,
				{
					withCredentials: true,
				},
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
