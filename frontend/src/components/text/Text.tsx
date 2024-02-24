import styles from "./Text.module.scss";

const Text = (props: React.HTMLAttributes<HTMLDivElement>) => {
	const { children } = props;

	return (
		<div {...props} className={`${styles.container} ${props.className}`}>
			<div className={styles.opacity} />
			<p className={styles.text}>{children}</p>
		</div>
	);
};

export default Text;
