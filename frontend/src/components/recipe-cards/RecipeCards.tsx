import { useEffect, useState } from "react";
import RecipeOptions from "../recipe-options/RecipeOptions";
import styles from "./RecipeCards.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { IRecipeFetch } from "../../interfaces";
import { Pagination } from "@mui/material";
import pagination from "../../functions/pagination";

function sortByOption(array: IRecipeFetch[], sortOption: options) {
	if (sortOption === "popular") array.sort((a, b) => Number(b.rating) - Number(a.rating));
	else if (sortOption === "recently")
		array.sort((a, b) => new Date(a.creation_date).getTime() - new Date(b.creation_date).getTime());
	return pagination(array);
}

export type options = "popular" | "recently";

const RecipeCards = (props: { type?: string; subtype?: string; recipes: IRecipeFetch[] }) => {
	const { recipes } = props;

	const [sortOption, setSortOption] = useState<options>("popular");
	const [sortedRecipes, setSortedRecipes] = useState<IRecipeFetch[][]>([]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		setSortedRecipes(sortByOption(recipes, sortOption));
	}, [recipes, sortOption]);

	const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
		event.preventDefault();
		setPage(value);
	};

	return (
		<>
			{recipes.length ? (
				<>
					<p className={styles.recipeCount}>{`Всего найдено рецептов: ${recipes.length}`}</p>
					<RecipeOptions
						className={styles.options}
						setFilter={setSortOption}
						sortOption={sortOption}
					/>
					<div className={styles.divLine} />
					<div className={styles.containerCards}>
						{sortedRecipes[page - 1]?.map((recipe) => {
							return <RecipeCard key={recipe.id} {...recipe} />;
						})}
					</div>
					<Pagination
						className={styles.pagination}
						count={Math.ceil(recipes.length / 12)}
						sx={{
							".MuiPaginationItem-text": {
								color: "#ffffff !important",
							},
							".Mui-selected": {
								backgroundColor: "#dc8d61 !important",
							},
							".Mui-selected:hover": {
								backgroundColor: "#8898a6 !important",
							},
						}}
						page={page}
						onChange={paginationHandler}
						size="large"
						color="primary"
					/>
				</>
			) : (
				<h2>Рецептов не найдено</h2>
			)}
		</>
	);
};

export default RecipeCards;
