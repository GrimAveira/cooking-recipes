import { useState } from "react";
import BasicSelect from "../../components/basic-select/BasicSelect";
import ShellWrapper from "../../hoc/ShellWrapper";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "./CreateRoute.module.scss";

interface IRecipe {
	title: string;
	description: string;
	total_cooking_time: string;
	active_cooking_time: string;
	complexity: string;
	storage_time: string;
	servings_number: string;
	calories_number: string;
	score_number: string;
	image: string;
	kitchen: string;
	type: string;
	subtype: string;
}

const CreateRouteBase = () => {
	const [complexity, setComplexity] = useState<IRecipe>({
		active_cooking_time: "",
		calories_number: "",
		complexity: "",
		description: "",
		image: "",
		kitchen: "",
		score_number: "",
		servings_number: "",
		storage_time: "",
		subtype: "",
		title: "",
		total_cooking_time: "",
		type: "",
	});

	// const queries = [
	// 	{ queryKey: 'todos', queryFn: fetchTodos },
	// 	{ queryKey: 'users', queryFn: fetchUsers },
	//   ];

	const changeHandler = (event: SelectChangeEvent) => {
		event.target;
		setComplexity(event.target.value as string);
	};

	const selects = [
		{
			onChange: changeHandler,
			value: complexity,
			name: "complexity",
			label: "Сложность готовки",
			options: [
				{ value: "1", title: "1" },
				{ value: "1", title: "1" },
			],
		},
	];

	return (
		<div className={styles.container}>
			{selects.map((select) => (
				<BasicSelect
					onChange={select.onChange}
					value={select.value}
					options={select.options}
					name={select.name}
					label={select.label}
				/>
			))}
			АЛО
			<text />
		</div>
	);
};
const CreateRoute = () => ShellWrapper(CreateRouteBase);
export default CreateRoute;
