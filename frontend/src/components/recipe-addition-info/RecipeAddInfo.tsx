import styles from "./RecipeAddInfo.module.scss";

const RecipeAddInfo = (props: { name: string; value: string }) => {
	const { name, value } = props;

	return (
		<li className={styles.container}>
			<p className={styles.p}>{name}</p>
			<div className={styles.dots} />
			<p className={styles.p}>{value}</p>
		</li>
	);
};

export default RecipeAddInfo;
