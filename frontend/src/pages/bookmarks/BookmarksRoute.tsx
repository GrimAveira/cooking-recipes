import RecipeCardsBookmarks from "../../components/recipe-cards-bookmarks/RecipeCardsBookmarks";
import ShellWrapper from "../../hoc/ShellWrapper";
import styles from "./BookmarksRoute.module.scss";

function BookmarksRouteBase() {
	return (
		<div className={styles.container}>
			<h2>Избранные рецепты</h2>
			<div className={styles.line} />
			<RecipeCardsBookmarks />
		</div>
	);
}

const BookmarksRoute = () => ShellWrapper(BookmarksRouteBase);
export default BookmarksRoute;
