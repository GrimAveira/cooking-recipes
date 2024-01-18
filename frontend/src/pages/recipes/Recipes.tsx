import { useParams } from "react-router-dom";
import styles from "./Recipes.module.scss";
import ShellWrapper from "../../hoc/ShellWrapper";
import MinorHeader from "../../components/minorHeader/MinorHeader";
import { translates } from "../../constants";

const RecipesBase = () => {
	const { type } = useParams<string>();

	if (typeof type !== "string") {
		return <div>{"Error"}</div>;
	}
	const obj = translates.get(type);
	if (typeof obj === "undefined") {
		return <div>{"Error"}</div>;
	}
	return (
		<main>
			<MinorHeader background={obj.background} title={obj.title} />
		</main>
	);
};
const Recipes = () => ShellWrapper(RecipesBase);
export default Recipes;
