import axios from "axios";
import { IUserData, IUserFetchData } from "../interfaces";
import { hostIp } from "../constants";
axios.defaults.withCredentials = true;
export default class UserService {
	static async registration(userData: IUserData) {
		try {
			const response = await axios.post(`http://${hostIp}:3000/api/auth/registration`, userData);
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
			const response = await axios.post(`http://${hostIp}:3000/api/auth/login`, userData, {
				withCredentials: true,
			});
			console.log(response);
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
			const response = await axios.get(`http://${hostIp}:3000/api/auth/logout`, {
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
	static async isAuth() {
		try {
			const response = await axios.get(`http://${hostIp}:3000/api/auth/isAuth`, {
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
	static async getAll(login: string) {
		try {
			const response = await axios.get<IUserFetchData>(`http://${hostIp}:3000/api/user/${login}`, {
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
	static async updateData(payload: { firstName: string; secondName: string; login: string }) {
		try {
			const response = await axios.put(`http://${hostIp}:3000/api/user/updateData`, payload, {
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
	static async updatePassword(payload: {
		login: string;
		oldPassword: string;
		newPassword: string;
	}) {
		try {
			const response = await axios.put(`http://${hostIp}:3000/api/user/updatePassword`, payload, {
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
