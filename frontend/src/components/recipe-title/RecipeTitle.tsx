import styles from "./RecipeTitle.module.scss";

interface IProps extends React.AllHTMLAttributes<HTMLDivElement> {
	text: string;
}

const RecipeTitle = (props: IProps) => {
	const { children, text } = props;

	return (
		<div {...props} className={`${props.className} ${styles.container}`}>
			{children}
			<p className={styles.p}>{text}</p>
		</div>
	);
};

export default RecipeTitle;
