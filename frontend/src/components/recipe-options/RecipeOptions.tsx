import { recipeOptions } from "../../constants";
import { options } from "../recipe-cards/RecipeCards";
import styles from "./RecipeOptions.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	setFilter: React.Dispatch<React.SetStateAction<options>>;
}

const RecipeOptions = (props: IProps) => {
	const { setFilter, ...remainProps } = props;

	return (
		<div {...remainProps} className={styles.container}>
			<button className={styles.optionButton} onClick={() => setFilter("popular")}>
				<img src={recipeOptions.favorite} alt="Популярные" />
				<p className={styles.option}>Популярные рецепты</p>
			</button>
			<button className={styles.optionButton} onClick={() => setFilter("recently")}>
				<img src={recipeOptions.recently} alt="Недавние" />
				<p className={styles.option}>Недавние рецепты</p>
			</button>
		</div>
	);
};

export default RecipeOptions;
