import ShellWrapper from "../../hoc/ShellWrapper";
import CategoryCards from "../../components/category-cards/CategoryCards";

const HomeRoute = () => {
	return ShellWrapper(CategoryCards);
};

export default HomeRoute;
