import { useContext, useEffect, useState } from "react";
import styles from "./RecipeCardsBookmarks.module.scss";
import RecipeCard from "../recipe-card/RecipeCard";
import { IRecipeFetch } from "../../interfaces";
import { Pagination } from "@mui/material";
import pagination from "../../functions/pagination";
import BookmarkService from "../../api/BookmarkService";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "react-query";
import CustomError from "../custom-error/CustomError";
import Loader from "../loader/Loader";
import RecipeService from "../../api/RecipeService";

function filterRecipes(array: IRecipeFetch[], bookmarks: string[]) {
	array = array.filter((obj) => {
		return bookmarks.includes(obj.id);
	});
	return pagination(array);
}

const RecipeCardsBookmarks = () => {
	const { login } = useContext(AuthContext);

	const [filteredRecipes, setFilteredRecipes] = useState<IRecipeFetch[][]>([]);
	const [page, setPage] = useState<number>(1);

	const {
		isLoading: isLoadingRecipes,
		isError: isErrorRecipes,
		data: recipesFetch,
	} = useQuery({
		queryKey: ["recipes"],
		queryFn: () => {
			return RecipeService.getAll();
		},
	});

	const {
		isError: isErrorBookmarks,
		isLoading: isLoadingBookmarks,
		data: bookmarkFetch,
	} = useQuery({
		queryKey: ["userBookmarks", login],
		queryFn: () => {
			return BookmarkService.getByUser({ login });
		},
	});

	useEffect(() => {
		recipesFetch && bookmarkFetch && setFilteredRecipes(filterRecipes(recipesFetch, bookmarkFetch));
	}, [recipesFetch, bookmarkFetch]);

	const paginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
		event.preventDefault();
		setPage(value);
	};

	if (isLoadingBookmarks || isLoadingRecipes) return <Loader />;

	if (isErrorBookmarks || isErrorRecipes) return <CustomError description={"Произошла ошибка"} />;

	return (
		<>
			<p
				className={styles.recipeCount}
			>{`Всего найдено рецептов: ${filteredRecipes?.length + 1}`}</p>
			<div className={styles.divLine} />
			<div className={styles.containerCards}>
				{filteredRecipes[page - 1]?.map((recipe) => {
					return <RecipeCard key={recipe.id} {...recipe} />;
				})}
			</div>
			<Pagination
				className={styles.pagination}
				count={Math.floor(filteredRecipes?.length / 12) + 1}
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
	);
};

export default RecipeCardsBookmarks;
