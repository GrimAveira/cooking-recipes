import { ChangeEvent, useState, useContext, useEffect } from "react";
import BasicSelect from "../../components/basic-select/BasicSelect";
import ShellWrapper from "../../hoc/ShellWrapper";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "./CreateRoute.module.scss";
import TypeService from "../../api/TypeService";
import SubtypeService from "../../api/SubTypeService";
import KitchenService from "../../api/KitchenService";
import { useMutation, useQuery } from "react-query";
import BasicInput from "../../components/basic-input/BasicInput";
import { getImageSize } from "react-image-size";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";
import { ICookingStage, IDataFetch, IIngredient, IRecipe } from "../../interfaces";
import { AuthContext } from "../../context/AuthContext";
import RecipeService from "../../api/RecipeService";
import ClassificationService from "../../api/ClassificationService";
import CookingStage from "../../components/cooking-stage/CookingStage";
import Ingredient from "../../components/ingredient/Ingredient";
import IngredientService from "../../api/IngredientService";

const CreateRouteBase = () => {
	const { login } = useContext(AuthContext);

	const [recipe, setRecipe] = useState<IRecipe>({
		login: login,
		active_cooking_time: "",
		calories_number: "",
		complexity: "1",
		description: "",
		image: undefined,
		kitchen: "1",
		servings_number: "",
		storage_time: "",
		subtype: "1",
		title: "",
		total_cooking_time: "",
		type: "1",
	});
	const [image, setImage] = useState<FormData>();
	const [preview, setPreview] = useState<File>();
	const [filteredSubtypes, setFilteredSubtypes] = useState<IDataFetch[]>([]);
	const [cookingStages, setCookingStages] = useState<ICookingStage[]>([]);
	const [ingredients, setIngredients] = useState<IIngredient[]>([]);

	const {
		isError: isTypesError,
		isLoading: isTypesLoading,
		data: types,
	} = useQuery("types", () => TypeService.getAll());
	const {
		isError: isSubtypesError,
		isLoading: isSubtypesLoading,
		data: subtypes,
	} = useQuery("subtypes", () => SubtypeService.getAll());
	const {
		isError: isKitchensError,
		isLoading: isKitchensLoading,
		data: kitchens,
	} = useQuery("kitchens", () => KitchenService.getAll());
	const {
		isError: isClassificationsError,
		isLoading: isClassificationsLoading,
		data: classifications,
	} = useQuery("classifications", () => ClassificationService.getAll());
	const {
		isError: isIngredientsError,
		isLoading: isIngredienstLoading,
		data: ingredientsFetch,
	} = useQuery("ingredients", () => IngredientService.getAll());

	const changeHandler = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
	) => {
		event.target;
		setRecipe((recipe) => ({ ...recipe, [event.target.name]: event.target.value }));
	};
	const changeHandlerImage = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const file = event.target.files[0];
			const imageUrl = URL.createObjectURL(file);
			const { width, height } = await getImageSize(imageUrl);
			console.log(width, height);
			if (width >= 800 && width <= 1000 && height >= 500 && height <= 700) {
				const formData = new FormData();
				formData.append("image", file);
				setImage(formData);
				setPreview(file);
			} else {
				event.target.value = "";
				promiseFail("Изображение приблизительно должно иметь разрешение 900x600");
			}
		}
	};
	const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (image) mutationRecipe.mutate({ image, recipe, cookingStages, ingredients });
	};
	const addStage = () => {
		setCookingStages((cookingStages) => {
			return [
				...cookingStages,
				{
					stageId: cookingStages.length,
					stageTitle: "",
					image: undefined,
					description: "",
				},
			];
		});
	};
	const addIngredient = () => {
		setIngredients((ingredients) => {
			return [
				...ingredients,
				{
					ingredientId: ingredients.length,
					ingredient: "1",
					notation: "",
					quantity: "0",
				},
			];
		});
	};

	const mutationRecipe = useMutation({
		mutationFn: async (payload: {
			image: FormData;
			recipe: IRecipe;
			cookingStages: ICookingStage[];
			ingredients: IIngredient[];
		}) => {
			return await RecipeService.add(payload);
		},
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		if (classifications && subtypes && types) {
			const filteredClassifictaion = classifications.reduce((accum: string[], item) => {
				if (item.type == recipe.type) return [...accum, item.subtype];
				return accum;
			}, []);
			setFilteredSubtypes(
				subtypes.filter((item) => {
					return filteredClassifictaion.includes(item.id);
				}),
			);
		}
	}, [recipe.type, subtypes, classifications, types]);

	if (
		isClassificationsLoading ||
		isKitchensLoading ||
		isSubtypesLoading ||
		isTypesLoading ||
		isIngredienstLoading
	) {
		return <div>Loading...</div>;
	}

	if (
		isClassificationsError ||
		isKitchensError ||
		isSubtypesError ||
		isTypesError ||
		isIngredientsError
	) {
		return <div>Error</div>;
	}

	if (types && kitchens && classifications && ingredientsFetch) {
		const selects = [
			{
				changeHandler: changeHandler,
				value: recipe.complexity,
				name: "complexity",
				label: "Сложность готовки",
				options: [
					{ value: "1", title: "1" },
					{ value: "2", title: "2" },
					{ value: "3", title: "3" },
					{ value: "4", title: "4" },
					{ value: "5", title: "5" },
				],
			},
			{
				changeHandler: changeHandler,
				value: recipe.type,
				name: "type",
				label: "Тип блюда",
				options: types.map((type) => ({ value: type.id, title: type.name })),
			},
			{
				changeHandler: changeHandler,
				value: recipe.subtype,
				name: "subtype",
				label: "Подтип блюда",
				options: filteredSubtypes.map((subtype) => ({ value: subtype.id, title: subtype.name })),
			},
			{
				changeHandler: changeHandler,
				value: recipe.kitchen,
				name: "kitchen",
				label: "Кухня",
				options: kitchens.map((kitchen) => ({ value: kitchen.id, title: kitchen.name })),
			},
		];
		const inputs = [
			{
				label: "Время активной готовки",
				name: "active_cooking_time",
				value: recipe.active_cooking_time,
				pattern: "^[0-9\\W]{1,30}$",
				title: "Количество симоволов не должно превышать 30",
			},
			{
				label: "Название рецепта",
				name: "title",
				value: recipe.title,
				pattern: "^[\\W]{2,30}$",
				title: "Название должно содержать кириллицу и содержать не более 30 символов",
			},
			{
				label: "Время хранения",
				name: "storage_time",
				value: recipe.storage_time,
				pattern: "^[0-9\\W]{1,30}",
				title: "Количество симоволов не должно превышать 30",
			},
			{
				label: "Общее время готовки",
				name: "total_cooking_time",
				value: recipe.total_cooking_time,
				pattern: "^[0-9\\W]{1,30}",
				title: "Количество симоволов не должно превышать 30",
			},
			{
				label: "Количество порций",
				name: "servings_number",
				value: recipe.servings_number,
				pattern: "^[0-9]{1,2}$",
				title: "Напишите число",
			},
			{
				label: "Количество килокалорий",
				name: "calories_number",
				value: recipe.calories_number,
				pattern: "^[0-9]{1,5}$",
				title: "Напишите число",
			},
		];
		return (
			<div className={styles.container}>
				<form onSubmit={submitHandler}>
					{selects.map((select) => (
						<BasicSelect
							{...select}
							key={select.name}
							className={styles.select}
							required={true}
							title="Нужно заполнить"
						/>
					))}
					<textarea
						className={styles.textArea}
						onChange={changeHandler}
						value={recipe.description}
						name="description"
						maxLength={500}
					/>
					{inputs.map((input) => (
						<BasicInput
							{...input}
							key={input.name}
							className={styles.input}
							required={true}
							changeHandler={changeHandler}
						/>
					))}
					<input type="file" onChange={changeHandlerImage} name="image" required={true} title="" />
					{preview && (
						<img
							src={URL.createObjectURL(preview)}
							alt="preview"
							style={{ height: "600px", width: "900px" }}
						/>
					)}
					<div>
						{ingredients?.map((ingredient) => (
							<Ingredient
								{...ingredient}
								ingredientsFetch={ingredientsFetch}
								key={ingredient.ingredientId}
								setIngredients={setIngredients}
							/>
						))}
						<button onClick={addIngredient} type="button">
							Add
						</button>
					</div>
					<div>
						{cookingStages?.map((stage) => (
							<CookingStage {...stage} key={stage.stageId} setCookingStages={setCookingStages} />
						))}
						<button onClick={addStage} type="button">
							Add
						</button>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}

	return <></>;
};
const CreateRoute = () => ShellWrapper(CreateRouteBase);
export default CreateRoute;
