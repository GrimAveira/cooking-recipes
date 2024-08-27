import { useParams } from "react-router-dom";
import styles from "./RecipesRoute.module.scss";
import ShellWrapper from "../../hoc/ShellWrapper";
import MinorHeader from "../../components/minor-header/MinorHeader";
import TypesBar from "../../components/types-bar/TypesBar";
import Recipes from "../../components/recipes/Recipes";

const RecipesRouteBase = () => {
	const { type, subtype, id } = useParams();

	return (
		<main>
			<MinorHeader type={subtype ? subtype : type} />
			<article className={styles.container}>
				{typeof subtype === "undefined" && <TypesBar className={styles.typesBar} type={type} />}
				<Recipes id={id} type={type} subtype={subtype} />
			</article>
		</main>
	);
};
const RecipesRoute = () => ShellWrapper(RecipesRouteBase);
export default RecipesRoute;
