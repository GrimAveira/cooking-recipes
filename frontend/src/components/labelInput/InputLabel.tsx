import React from "react";
import Input from "../input/Input";
import styles from "./InputLabel.module.scss";

interface PropsI extends React.HTMLAttributes<HTMLDivElement> {
	label: { title: string; fontSize?: string };
	input?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputLabel: React.FC<PropsI> = (props) => {
	const { label, input, ...remainProps } = props;
	return (
		<div {...remainProps}>
			<label
				className={styles.label}
				style={{ fontSize: label.fontSize }}
				htmlFor={input ? input.name : undefined}
			>
				{label.title}
			</label>
			<Input {...input} />
		</div>
	);
};

export default InputLabel;
