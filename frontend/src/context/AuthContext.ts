import { createContext } from "react";

export type TRole = "1" | "2" | null;
export type TLogin = string | null;

export interface AuthContextType {
	isAuth: boolean;
	role: TRole;
	login: TLogin;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	setRole: React.Dispatch<React.SetStateAction<TRole>>;
	setLogin: React.Dispatch<React.SetStateAction<TLogin>>;
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	role: null,
	login: null,
	setIsAuth: () => {},
	setRole: () => {},
	setLogin: () => {},
});
