import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IOptions } from "../../interfaces";
import styles from "./BasicSelect.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	changeHandler: (event: SelectChangeEvent) => void;
	value: string;
	options: IOptions[];
	label: string;
	name: string;
	required: boolean;
}

export default function BasicSelect(props: IProps) {
	const { changeHandler, value, options, label, name, className, required, title } = props;

	return (
		<div className={className}>
			<FormControl className={`${styles.container} `}>
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
					title={title}
					required={required}
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
					onChange={changeHandler}
				>
					{options.map((option) => (
						<MenuItem key={option.title} value={option.value}>
							{option.title}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
