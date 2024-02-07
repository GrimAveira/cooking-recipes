import axios from "axios";
import { IUserData } from "../pages/registratrion/Registration";

export default class UserService {
	static async registration(userData: IUserData) {
		try {
			const response = await axios.post("http://localhost:3000/api/auth/registration", userData);
			return response.data;
		} catch (error) {
			return error;
		}
	}
}
