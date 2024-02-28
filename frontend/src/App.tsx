import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext, TLogin, TRole } from "./context/AuthContext";
import UserService from "./api/UserService";
import { useMutation } from "react-query";
import { promiseFail } from "./functions/toastTrigger";
import { IAuthInfo } from "./interfaces/index";
import HomeRoute from "./pages/home/HomeRoute";
import LoginRoute from "./pages/login/LoginRoute";
import RegistrationRoute from "./pages/registratrion/RegistrationRoute";
import RecipesRoute from "./pages/recipes/RecipesRoute";
import CreateRoute from "./pages/create/CreateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routerShell = createBrowserRouter([
	{
		path: "/",
		element: <HomeRoute />,
	},
	{
		path: "/login",
		element: <LoginRoute />,
	},
	{
		path: "/registration",
		element: <RegistrationRoute />,
	},
	{
		path: "recipes/:type",
		element: <RecipesRoute />,
	},
	{
		path: "recipes/:type/:subtype",
		element: <RecipesRoute />,
	},
	{
		path: "recipes/:type/:subtype/:id",
		element: <RecipesRoute />,
	},
	{
		path: "create",
		element: <CreateRoute />,
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
