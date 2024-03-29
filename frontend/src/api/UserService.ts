import axios from "axios";
import { IUserData } from "../interfaces";
axios.defaults.withCredentials = true;
export default class UserService {
	static async registration(userData: IUserData) {
		try {
			const response = await axios.post(
				"http://192.168.0.106:3000/api/auth/registration",
				userData,
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
	static async authorization(userData: IUserData) {
		try {
			const response = await axios.post("http://192.168.0.106:3000/api/auth/login", userData);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async logout() {
		try {
			const response = await axios.delete("http://192.168.0.106:3000/api/auth/logout");
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw error.response?.data;
			} else if (error instanceof Error) {
				throw error.message;
			}
		}
	}
	static async isAuth() {
		try {
			const response = await axios.get("http://192.168.0.106:3000/api/auth/isAuth");
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
