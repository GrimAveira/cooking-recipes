import { IData, IIngredient } from "../../interfaces";
import BasicSelect from "../basic-select/BasicSelect";
import BasicInput from "../basic-input/BasicInput";
import { SelectChangeEvent } from "@mui/material";

interface IProps extends React.HTMLAttributes<HTMLDivElement>, IIngredient {
	setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>;
	ingredientsFetch: IData[];
	ingredientId: number;
}

function Ingredient(props: IProps) {
	const { setIngredients, ingredientId, ingredient, notation, quantity, ingredientsFetch } = props;

	const removeIngredient = () => {
		setIngredients((ingredients) => {
			return ingredients.filter((ingredient) => ingredient.ingredientId !== ingredientId);
		});
	};

	const changeSelectHandler = (event: SelectChangeEvent) => {
		setIngredients((ingredients) => {
			const newIngredients = [...ingredients];
			newIngredients[Number(ingredientId)].ingredient = event.target.value;
			return newIngredients;
		});
	};
	const changeNotationHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setIngredients((ingredients) => {
			const newIngredients = [...ingredients];
			newIngredients[Number(ingredientId)].notation = event.target.value;
			return newIngredients;
		});
	};
	const changeQuantityHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setIngredients((ingredients) => {
			const newIngredients = [...ingredients];
			newIngredients[Number(ingredientId)].quantity = event.target.value;
			return newIngredients;
		});
	};

	const inputs = [
		{
			label: "Замечание",
			value: notation,
			pattern: "^[0-9\\W]{1,30}$",
			title: "Не должно превышать порог в 30 символов",
			changeHandler: changeNotationHandler,
		},
		{
			label: "Количество",
			value: quantity,
			pattern: "^[0-9]{1,10}$",
			title: "Напишите число",
			changeHandler: changeQuantityHandler,
		},
	];

	return (
		<div>
			<BasicSelect
				label="Ингредиент"
				name="ingredient"
				value={ingredient}
				options={ingredientsFetch.map((ingredient) => {
					return { value: ingredient.id, title: ingredient.name };
				})}
				required={true}
				changeHandler={changeSelectHandler}
			/>
			{inputs.map((input) => {
				return <BasicInput {...input} required={true} />;
			})}
			<button type="button" onClick={removeIngredient}>
				Del
			</button>
		</div>
	);
}

export default Ingredient;
