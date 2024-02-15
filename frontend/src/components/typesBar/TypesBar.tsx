import React from "react";
import styles from "./TypesBar.module.scss";
import { RECIPES_TYPES } from "../../constants";
import SubTypeCard from "../subTupyCard/SubTypeCard";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
	type?: string;
}

const TypesBar = (props: PropsI) => {
	const { type, ...remainProps } = props;

	if (typeof type !== "string") {
		return <div>{"String Error"}</div>;
	}
	const obj = RECIPES_TYPES.get(type);
	if (typeof obj === "undefined") {
		return <div>{"Undefined Error"}</div>;
	}

	return (
		<div {...remainProps} className={remainProps.className}>
			<article className={styles.container}>
				{obj.subtypes &&
					obj.subtypes.map((type) => {
						return (
							<SubTypeCard img={type.img} title={type.title} url={type.url} key={type.title} />
						);
					})}
			</article>
		</div>
	);
};

export default TypesBar;
