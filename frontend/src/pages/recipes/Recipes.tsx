import { useParams } from "react-router-dom";
import styles from "./Recipes.module.scss";
import ShellWrapper from "../../hoc/ShellWrapper";
import MinorHeader from "../../components/minorHeader/MinorHeader";
import TypesBar from "../../components/typesBar/TypesBar";

const RecipesBase = () => {
	const { type, subtype } = useParams();

	return (
		<main>
			<MinorHeader type={type} />
			{typeof subtype === "undefined" && <TypesBar className={styles.typesBar} type={type} />}
		</main>
	);
};
const Recipes = () => ShellWrapper(RecipesBase);
export default Recipes;
