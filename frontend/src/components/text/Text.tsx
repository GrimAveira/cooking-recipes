import styles from "./Text.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	description: string;
}

const Text = (props: IProps) => {
	const { description } = props;

	return (
		<div {...props} className={`${styles.container} ${props.className}`}>
			<div className={styles.opacity} />
			<div className={styles.userInfo}>
				{props.children}
				<p className={styles.text}>{description}</p>
			</div>
		</div>
	);
};

export default Text;
