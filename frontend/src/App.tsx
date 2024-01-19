import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Registration from "./pages/registratrion/Registration";
import Recipes from "./pages/recipes/Recipes";

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
	return (
		<>
			<RouterProvider router={routerShell} />
		</>
	);
}

export default App;
