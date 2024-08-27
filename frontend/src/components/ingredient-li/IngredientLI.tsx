import styles from "./IngredientLI.module.scss";

const IngredientLI = (props: { name: string; quantity: string; notation: string }) => {
	const { name, notation, quantity } = props;

	return (
		<li className={styles.container}>
			<p className={styles.text}>{name}</p>
			<div className={styles.dots} />
			<p className={styles.text}>{`${quantity} ${notation}`}</p>
		</li>
	);
};

export default IngredientLI;
