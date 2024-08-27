import { Link } from "react-router-dom";
import { IChangeByUser, IRecipeFetch } from "../../interfaces";
import styles from "./RecipeCard.module.scss";
import { TYPES_TRANSLATE_RU_ENG, hostIp } from "../../constants";
import BookmarkService from "../../api/BookmarkService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery } from "react-query";
import Loader from "../loader/Loader";
import CustomError from "../custom-error/CustomError";
import { promiseSuccess, promiseFail } from "../../functions/toastTrigger";

const RecipeCard = (props: IRecipeFetch) => {
	const {
		id,
		description,
		title,
		active_cooking_time,
		calories_number,
		image_path,
		type,
		subtype,
	} = props;

	const { login, isAuth } = useContext(AuthContext);

	const [bookmark, setBookmark] = useState<boolean>(false);

	const {
		isLoading,
		isError,
		data: bookmarkFetch,
	} = useQuery({
		queryKey: ["bookmarks", id, login],
		queryFn: () => {
			return BookmarkService.getByRecipe({ recipeID: id, login: login });
		},
	});

	const mutationBookmark = useMutation({
		mutationFn: async (payload: IChangeByUser) => {
			return await BookmarkService.changeByUser(payload);
		},
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		bookmarkFetch && setBookmark(Boolean(bookmarkFetch));
	}, [bookmarkFetch]);

	if (isLoading) return <Loader />;

	if (isError) return <CustomError description="Непредвиденная ошибка" />;

	return (
		<Link
			to={`/recipes/${TYPES_TRANSLATE_RU_ENG.get(type)}/${TYPES_TRANSLATE_RU_ENG.get(subtype)}/${id}`}
			className={styles.container}
		>
			<div
				style={{
					backgroundImage: `url('http://${hostIp}:3000/api/image/${image_path}')`,
				}}
				className={styles.img}
			/>
			<svg
				className={`${styles.svg} ${bookmark ? styles.svgHover : ""}`}
				onClick={(event) => {
					event.preventDefault();
					if (isAuth) {
						setBookmark((prev) => !prev);
						mutationBookmark.mutate({ login, recipeID: id, flag: !bookmark });
					} else promiseFail("Вы не вошли в систему");
				}}
				width="28"
				height="36"
				viewBox="0 0 28 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21.7778 0H6.2222C4.51108 0 3.11108 1.8 3.11108 4V36L14 30L24.8889 36V4C24.8889 1.8 23.4889 0 21.7778 0Z"
					fill="#DDDEDF"
					className={styles.path}
				/>
			</svg>
			<div className={styles.minorInfo}>
				<p className={styles.calories}>{`${calories_number} ккал `}</p>
				<p className={styles.time}>{`${active_cooking_time}`}</p>
			</div>
			<div className={styles.majorInfo}>
				<p className={styles.title}>{title}</p>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
};

export default RecipeCard;
