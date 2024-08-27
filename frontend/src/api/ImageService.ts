import axios from "axios";
import { hostIp } from "../constants";

export default class ImageService {
	static async upload(image: FormData) {
		try {
			const response = await axios.post<string>(`http://${hostIp}:3000/api/image/upload`, image, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
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
