import TextField, { TextFieldProps } from "@mui/material/TextField";
import styles from "./BasicInput.module.scss";
import { ChangeEvent } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	changeHandler: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	value: string;
	label: string;
	name?: string;
	pattern: string;
	title: string;
	required?: boolean;
	inputClass?: React.HTMLAttributes<TextFieldProps>;
}

export default function BasicInput(props: IProps) {
	const { label, name, className, value, changeHandler, title, pattern, inputClass } = props;

	return (
		<div className={className}>
			<TextField
				inputProps={{ pattern: pattern, title: title }}
				value={value}
				name={name}
				label={label}
				title={title}
				onChange={changeHandler}
				className={`${styles.container} ${inputClass}`}
				sx={{
					"& .MuiOutlinedInput-root": {
						color: "#ffffff",
						"& fieldset": {
							borderColor: "#dc8d61",
						},
						"&:hover fieldset": {
							borderColor: "#ffffff",
						},
						"&.Mui-focused fieldset": {
							borderColor: "#ffffff",
						},
					},
				}}
				id="outlined-basic"
				variant="outlined"
				InputLabelProps={{
					sx: {
						color: "#ffffff",
						"&.Mui-focused": {
							color: "#dc8d61",
						},
					},
				}}
			/>
		</div>
	);
}
