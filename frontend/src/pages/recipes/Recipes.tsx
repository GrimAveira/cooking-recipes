import { useParams } from "react-router-dom";
import styles from "./Recipes.module.scss";
import ShellWrapper from "../../hoc/ShellWrapper";
import MinorHeader from "../../components/minor-header/MinorHeader";
import TypesBar from "../../components/types-bar/TypesBar";
import RecipeWrapper from "../../components/recipe-cards/RecipeCards";

const RecipesBase = () => {
	const { type, subtype } = useParams();

	return (
		<main>
			<MinorHeader type={subtype ? subtype : type} />
			<article className={styles.container}>
				{typeof subtype === "undefined" && <TypesBar className={styles.typesBar} type={type} />}
				<RecipeWrapper type={type} subtype={subtype} />
			</article>
		</main>
	);
};
const Recipes = () => ShellWrapper(RecipesBase);
export default Recipes;
