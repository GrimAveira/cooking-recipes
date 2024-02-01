import React from "react";
import styles from "./MinorHeader.module.scss";
import { RECIPES_TYPES } from "../../constants";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
	type: string | undefined;
}

const MinorHeader = (props: PropsI) => {
	const { type, ...remainProps } = props;

	if (typeof type !== "string") {
		return <div>{"Error string"}</div>;
	}
	const obj = RECIPES_TYPES.get(type);
	if (typeof obj === "undefined") {
		return <div>{"Error undefined"}</div>;
	}

	return (
		<article
			{...remainProps}
			className={styles.container}
			style={{ backgroundImage: `url(${obj.background})` }}
		>
			<p className={styles.p}>{obj.title}</p>
		</article>
	);
};

export default MinorHeader;
