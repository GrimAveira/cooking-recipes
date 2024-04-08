import styles from "./UserOptions.module.scss";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";
import { useMutation, useQuery } from "react-query";
import LikeService from "../../api/LikeService";
import BookmarkService from "../../api/BookmarkService";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import { IChangeByUser } from "../../interfaces";

function UserOptions({
	first_name,
	second_name,
	isAuth,
	login,
	recipeID,
}: {
	first_name: string;
	second_name: string;
	isAuth: boolean;
	login: string;
	recipeID: string;
}) {
	const [like, setLike] = useState<boolean>(false);
	const [bookmark, setBookmark] = useState<boolean>(false);

	const { isLoading: isLoadingLikes, data: likeFetch } = useQuery({
		queryKey: ["likes", recipeID, login],
		queryFn: () => {
			return LikeService.getByRecipe({ recipeID: recipeID, login: login });
		},
	});

	const { isLoading: isLoadingBookmarks, data: bookmarkFetch } = useQuery({
		queryKey: ["bookmarks", recipeID, login],
		queryFn: () => {
			return BookmarkService.getByRecipe({ recipeID: recipeID, login: login });
		},
	});

	// const changeLikeHandler = (event: React.ChangeEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// };

	// const changeBookmarkHandler = (event: React.ChangeEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// };

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
	const mutationLike = useMutation({
		mutationFn: async (payload: IChangeByUser) => {
			return await LikeService.changeByUser(payload);
		},
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		likeFetch && setLike(Boolean(likeFetch));
	}, [likeFetch]);
	useEffect(() => {
		bookmarkFetch && setBookmark(Boolean(bookmarkFetch));
	}, [bookmarkFetch]);

	if (isLoadingBookmarks || isLoadingLikes) {
		return <Loader />;
	}

	return (
		<div className={styles.header}>
			<div className={styles.userContainer}>
				<svg
					width="50"
					height="50"
					viewBox="0 0 50 50"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M25.0002 25C29.6043 25 33.3335 21.2708 33.3335 16.6667C33.3335 12.0625 29.6043 8.33333 25.0002 8.33333C20.396 8.33333 16.6668 12.0625 16.6668 16.6667C16.6668 21.2708 20.396 25 25.0002 25ZM25.0002 29.1667C19.4377 29.1667 8.3335 31.9583 8.3335 37.5V41.6667H41.6668V37.5C41.6668 31.9583 30.5627 29.1667 25.0002 29.1667Z"
						fill="url(#paint0_linear_100_98)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_100_98"
							x1="25.0002"
							y1="8.33333"
							x2="25.0002"
							y2="41.6667"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#F9B992" />
							<stop offset="0.328125" stopColor="#EFAE89" />
							<stop offset="0.692708" stopColor="#BF7A56" />
							<stop offset="1" stopColor="#BA6D45" />
						</linearGradient>
					</defs>
				</svg>
				<p>
					{"Рецепт от "}
					<strong>
						{first_name} {second_name}
					</strong>
				</p>
			</div>
			<div className={styles.options}>
				<button
					className={`${styles.button} ${bookmark ? styles.buttonHover : ""}`}
					onClick={() => {
						if (isAuth) {
							setBookmark((prev) => !prev);
							mutationBookmark.mutate({ login, recipeID, flag: !bookmark });
						} else promiseFail("Вы не вошли в систему");
					}}
				>
					<svg
						className={styles.svg}
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
					<p className={styles.buttonText}>В избранное</p>
				</button>
				<button
					className={`${styles.button} ${like ? styles.buttonHover : ""}`}
					onClick={() => {
						if (isAuth) {
							setLike((prev) => !prev);
							mutationLike.mutate({ login, recipeID, flag: !like });
						} else promiseFail("Вы не вошли в систему");
					}}
				>
					<svg
						width="35"
						height="35"
						viewBox="0 0 35 35"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M35 13.9357C35 13.4168 34.6075 13.0943 33.8218 12.968L23.2633 11.4328L18.5308 1.86226C18.2645 1.28732 17.9207 1 17.5001 1C17.0796 1 16.736 1.28732 16.4695 1.86226L11.7368 11.4328L1.17773 12.968C0.392675 13.0943 0 13.4168 0 13.9357C0 14.2303 0.175341 14.5668 0.525949 14.9454L8.1823 22.3913L6.37341 32.908C6.34535 33.1044 6.33142 33.2451 6.33142 33.3289C6.33142 33.6233 6.40495 33.8721 6.55214 34.0756C6.69927 34.2794 6.91999 34.3808 7.21461 34.3808C7.46716 34.3808 7.74748 34.297 8.05595 34.1286L17.4999 29.1641L26.9445 34.1286C27.2395 34.297 27.5199 34.3808 27.7855 34.3808C28.0669 34.3808 28.2803 34.2794 28.4274 34.0756C28.5742 33.8724 28.6478 33.6233 28.6478 33.3289C28.6478 33.1468 28.6407 33.0066 28.6267 32.908L26.8176 22.3913L34.4528 14.9454C34.818 14.5808 35 14.2441 35 13.9357Z"
							fill="white"
						/>
					</svg>
					<p className={styles.buttonText}>Понравилось</p>
				</button>
			</div>
		</div>
	);
}

export default UserOptions;
