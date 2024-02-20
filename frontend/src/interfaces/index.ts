export interface ICategoryCard {
	img: string;
	url: string;
	title: string;
}
export interface IInputChanges {
	name: string;
	value: string;
}
export interface IUserData {
	login: string;
	password: string;
	firstName?: string;
	secondName?: string;
}
export interface IAuthInfo {
	role: "1" | "2";
	login: string;
	message: string;
}
export interface IRecipe {
	id: number;
	title: string;
	description: string;
	creation_date: string;
	total_cooking_time: string;
	active_cooking_time: string;
	complexity: string;
	storage_time: string;
	sevings_number: number;
	calories_number: number;
	score_number: number;
	rating: number;
	image_path: string;
	first_name: string;
	second_name: string;
	kitchen: string;
	type: string;
	subtype: string;
}
