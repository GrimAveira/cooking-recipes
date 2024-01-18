import React from "react";
import styles from "./MinorHeader.module.scss";

interface PropsI {
	background: string;
	title: string;
}

const MinorHeader = (props: PropsI) => {
	const { background, title } = props;
	return (
		<article className={styles.container} style={{ backgroundImage: `url(${background})` }}>
			<p className={styles.p}>{title}</p>
		</article>
	);
};

export default MinorHeader;
