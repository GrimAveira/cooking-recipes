import React from "react";
import Input from "../input/Input";
import styles from "./InputLabel.module.scss";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	input?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputLabel: React.FC<PropsI> = (props) => {
	const { label, input, ...remainProps } = props;
	return (
		<div {...remainProps}>
			<label className={styles.label} htmlFor={input ? input.name : undefined}>
				{label}
			</label>
			<Input {...input} />
		</div>
	);
};

export default InputLabel;
