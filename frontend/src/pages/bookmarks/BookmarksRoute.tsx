import ShellWrapper from "../../hoc/ShellWrapper";
import styles from "./BookmarksRoute.module.scss";

function BookmarksRouteBase() {
	return (
		<div className={styles.container}>
			<h1>Bookmarks</h1>
		</div>
	);
}

const BookmarksRoute = () => ShellWrapper(BookmarksRouteBase);
export default BookmarksRoute;
