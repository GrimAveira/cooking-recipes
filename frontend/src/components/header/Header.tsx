import styles from "./Header.module.scss";
import { logo } from "../../assets";
import Auth from "./Auth";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useQuery } from "react-query";
import RecipeService from "../../api/RecipeService";
import { useNavigate } from "react-router-dom";
import { TYPES_TRANSLATE_RU_ENG } from "../../constants";

const Header = () => {
	const {
		isLoading: isLoadingRecipes,
		isError: isErrorRecipes,
		data: recipesFetch,
	} = useQuery({
		queryKey: ["recipes"],
		queryFn: () => {
			return RecipeService.getAll();
		},
	});

	const navigate = useNavigate();

	if (recipesFetch) {
		return (
			<header className={styles.container}>
				<div className={styles.blur}></div>
				<a href="/" title="На главную">
					<img className={styles.logo} src={logo} />
				</a>
				<Autocomplete
					onChange={(_: unknown, newValue: string | null) => {
						const recipe = recipesFetch.find((recipe) => recipe.title == newValue);
						if (recipe)
							navigate(
								`/recipes/${TYPES_TRANSLATE_RU_ENG.get(recipe.type)}/${TYPES_TRANSLATE_RU_ENG.get(recipe.subtype)}/${recipe.id}`,
							);
					}}
					className={styles.search}
					sx={{
						".MuiOutlinedInput-notchedOutline": {
							borderColor: "#dc8d61 !important",
							color: "#ffffff !important",
						},
						".Mui-focused": {
							color: "#ffffff !important",
						},
						".MuiAutocomplete-inputRoot": {
							color: "#ffffff !important",
						},
					}}
					freeSolo
					id="free-solo-2-demo"
					disableClearable
					options={recipesFetch.map((recipe) => recipe.title)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Поиск"
							InputLabelProps={{
								sx: {
									color: "#ffffff !important",
								},
							}}
							InputProps={{
								...params.InputProps,
								type: "search",
							}}
						/>
					)}
				/>
				<Auth className={styles.auth} />
			</header>
		);
	}
};

export default Header;
