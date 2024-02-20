import { Link } from "react-router-dom";
import { IRecipe } from "../../interfaces";
import styles from "./RecipeCard.module.scss";

const RecipeCard = (props: IRecipe) => {
	const { id, description, title, active_cooking_time, calories_number, image_path } = props;

	return (
		<Link to={`${id}`} className={styles.container}>
			<img
				src={`http://192.168.0.106:3000/api/image/${image_path}`}
				alt=""
				className={styles.img}
			/>
			<svg
				className={styles.svg}
				width="28"
				height="36"
				viewBox="0 0 28 36"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={(event) => {
					event.preventDefault();
					console.log(1);
				}}
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
