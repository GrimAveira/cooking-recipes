import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IOptions } from "../../interfaces";
import styles from "./BasicSelect.module.scss";

interface IProps {
	onChange: (event: SelectChangeEvent) => void;
	value: string;
	options: IOptions[];
	label: string;
	name: string;
}

export default function BasicSelect(props: IProps) {
	const { onChange, value, options, label, name } = props;

	return (
		<FormControl className={styles.container}>
			<InputLabel
				id="demo-simple-select-label"
				sx={{
					color: "white",
					fontSize: "16px",
					"&.Mui-focused": {
						color: "#dc8d61",
					},
				}}
			>
				{label}
			</InputLabel>
			<Select
				sx={{
					color: "white",
					".MuiOutlinedInput-notchedOutline": {
						borderColor: "#dc8d61",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "white",
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "white",
					},
				}}
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
				label={label}
				name={name}
				onChange={onChange}
			>
				{options.map((option) => (
					<MenuItem value={option.value}>{option.title}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
