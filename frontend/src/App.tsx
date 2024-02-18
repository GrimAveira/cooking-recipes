import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Registration from "./pages/registratrion/Registration";
import Recipes from "./pages/recipes/Recipes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";

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

function App() {
	const [isAuth, setIsAuth] = useState(false);

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<RouterProvider router={routerShell} />
			<ToastContainer />
		</AuthContext.Provider>
	);
}

export default App;
