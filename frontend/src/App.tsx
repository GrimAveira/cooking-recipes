import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryCards from "./components/category-cards/CategoryCards";
import Footer from "./components/footer/Footer";
import Shell from "./components/shell/Shell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CategoryCards />,
  },
]);

function App() {
  return (
    <>
      <Shell />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
