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
