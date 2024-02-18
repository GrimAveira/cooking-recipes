import { createContext } from "react";
export interface AuthContextType {
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	setIsAuth: () => {},
});
