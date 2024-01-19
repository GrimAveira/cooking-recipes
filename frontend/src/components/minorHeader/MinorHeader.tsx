import React from "react";
import styles from "./MinorHeader.module.scss";
import { matches } from "../../constants";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
	type: string | undefined;
}

const MinorHeader = (props: PropsI) => {
	const { type, ...remainProps } = props;

	if (typeof type !== "string") {
		return <div>{"Error"}</div>;
	}
	const obj = matches.get(type);
	if (typeof obj === "undefined") {
		return <div>{"Error"}</div>;
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
