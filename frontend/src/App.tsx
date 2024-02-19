import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Registration from "./pages/registratrion/Registration";
import Recipes from "./pages/recipes/Recipes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AuthContext, TLogin, TRole } from "./context/AuthContext";
import UserService from "./api/UserService";
import { useMutation } from "react-query";
import { promiseFail } from "./functions/toastTrigger";
import { IAuthInfo } from "./interfaces/index";

const routerShell = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/registration",
		element: <Registration />,
	},
	{
		path: "recipes/:type",
		element: <Recipes />,
	},
	{
		path: "recipes/:type/:subtype",
		element: <Recipes />,
	},
]);

const checkIsAuth = async () => {
	const data = await UserService.isAuth();
	return data;
};

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [role, setRole] = useState<TRole>(null);
	const [login, setLogin] = useState<TLogin>(null);

	const mutationAuth = useMutation({
		mutationFn: checkIsAuth,
		onSuccess(response: IAuthInfo) {
			setIsAuth(true);
			setRole(response.role);
			setLogin(response.login);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		mutationAuth.mutate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth, role, login, setIsAuth, setRole, setLogin }}>
			<RouterProvider router={routerShell} />
			<ToastContainer />
		</AuthContext.Provider>
	);
}

export default App;
