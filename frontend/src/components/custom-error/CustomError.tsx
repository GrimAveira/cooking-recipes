import styles from "./CustomError.module.scss";

function CustomError({ description }: { description: string }) {
	return (
		<div className={styles.exContainer}>
			<div className={styles.inContainer}>
				<h3>{description}</h3>
			</div>
		</div>
	);
}

export default CustomError;
