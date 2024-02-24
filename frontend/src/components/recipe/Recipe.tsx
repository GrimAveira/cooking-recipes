import { useEffect, useState } from "react";
import { IRecipe } from "../../interfaces";
import styles from "./Recipe.module.scss";
import { hostIp } from "../../constants";
import IngredientService from "../../api/IngredientService";
import { useQuery } from "react-query";
import IngredientLI from "../../ingredient-li/IngredientLI";
import Text from "../text/Text";
import RecipeAddInfo from "../recipe-addition-info/RecipeAddInfo";
import RecipeTitle from "../recipe-title/RecipeTitle";
import Comments from "../comments/Comments";
import Loader from "../loader/Loader";

const Recipe = (props: { recipes: IRecipe[]; id: string }) => {
	const { recipes, id } = props;

	const [recipe, setRecipe] = useState<IRecipe>();

	const { isLoading, data } = useQuery({
		queryKey: ["ingredients"],
		queryFn: () => {
			return IngredientService.getByRecipe(id);
		},
	});

	useEffect(() => {
		if (recipes) setRecipe(recipes.find((recipe) => recipe.id.toString() === id));
	}, [recipes, id]);

	if (isLoading) return <Loader />;

	if (recipe) {
		const addInfo = [
			{ name: "Активное время приготовления", value: recipe.active_cooking_time },
			{ name: "Время хранения", value: recipe.storage_time },
			{ name: "Количество порций", value: recipe.servings_number },
			{ name: "Полное время приготовления", value: recipe.total_cooking_time },
			{ name: "Сложность готовки", value: recipe.complexity },
			{ name: "Энергитическая ценность", value: recipe.calories_number },
		];
		return (
			<div className={styles.container}>
				<p className={styles.title}>{recipe.title}</p>
				<div className={styles.header}>
					<div className={styles.userContainer}>
						<svg
							width="50"
							height="50"
							viewBox="0 0 50 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.0002 25C29.6043 25 33.3335 21.2708 33.3335 16.6667C33.3335 12.0625 29.6043 8.33333 25.0002 8.33333C20.396 8.33333 16.6668 12.0625 16.6668 16.6667C16.6668 21.2708 20.396 25 25.0002 25ZM25.0002 29.1667C19.4377 29.1667 8.3335 31.9583 8.3335 37.5V41.6667H41.6668V37.5C41.6668 31.9583 30.5627 29.1667 25.0002 29.1667Z"
								fill="url(#paint0_linear_100_98)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_100_98"
									x1="25.0002"
									y1="8.33333"
									x2="25.0002"
									y2="41.6667"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#F9B992" />
									<stop offset="0.328125" stopColor="#EFAE89" />
									<stop offset="0.692708" stopColor="#BF7A56" />
									<stop offset="1" stopColor="#BA6D45" />
								</linearGradient>
							</defs>
						</svg>
						<p>
							{"Рецепт от "}
							<strong>
								{recipe.first_name} {recipe.second_name}
							</strong>
						</p>
					</div>
					<div className={styles.options}>
						<button className={styles.button}>
							<svg
								className={styles.svg}
								width="28"
								height="36"
								viewBox="0 0 28 36"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21.7778 0H6.2222C4.51108 0 3.11108 1.8 3.11108 4V36L14 30L24.8889 36V4C24.8889 1.8 23.4889 0 21.7778 0Z"
									fill="#DDDEDF"
									className={styles.path}
								/>
							</svg>
							<p className={styles.buttonText}>В избранное</p>
						</button>
						<button className={styles.button}>
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M35 13.9357C35 13.4168 34.6075 13.0943 33.8218 12.968L23.2633 11.4328L18.5308 1.86226C18.2645 1.28732 17.9207 1 17.5001 1C17.0796 1 16.736 1.28732 16.4695 1.86226L11.7368 11.4328L1.17773 12.968C0.392675 13.0943 0 13.4168 0 13.9357C0 14.2303 0.175341 14.5668 0.525949 14.9454L8.1823 22.3913L6.37341 32.908C6.34535 33.1044 6.33142 33.2451 6.33142 33.3289C6.33142 33.6233 6.40495 33.8721 6.55214 34.0756C6.69927 34.2794 6.91999 34.3808 7.21461 34.3808C7.46716 34.3808 7.74748 34.297 8.05595 34.1286L17.4999 29.1641L26.9445 34.1286C27.2395 34.297 27.5199 34.3808 27.7855 34.3808C28.0669 34.3808 28.2803 34.2794 28.4274 34.0756C28.5742 33.8724 28.6478 33.6233 28.6478 33.3289C28.6478 33.1468 28.6407 33.0066 28.6267 32.908L26.8176 22.3913L34.4528 14.9454C34.818 14.5808 35 14.2441 35 13.9357Z"
									fill="white"
								/>
							</svg>
							<p className={styles.buttonText}>Понравилось</p>
						</button>
					</div>
				</div>
				<div
					className={styles.img}
					style={{
						backgroundImage: `url('http://${hostIp}:3000/api/image/${recipe.image_path}')`,
					}}
				>
					<p className={styles.totalTime}>
						<svg
							width="30"
							height="30"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={styles.clockSvg}
						>
							<g clip-path="url(#clip0_399_2)">
								<path
									d="M24 0C37.2 0 48 10.8 48 24C48 37.2 37.2 48 24 48C10.8 48 -9.38773e-07 37.2 -9.38773e-07 24C-9.38773e-07 10.8 10.8 0 24 0ZM24 43.2C34.56 43.2 43.2 34.56 43.2 24C43.2 13.44 34.56 4.8 24 4.8C13.44 4.8 4.8 13.44 4.8 24C4.8 34.56 13.44 43.2 24 43.2Z"
									fill="url(#paint0_linear_399_2)"
								/>
								<path
									d="M22.8 12H26.4V26.4L13.92 34.08L12 30.96L22.8 24.48V12Z"
									fill="url(#paint1_linear_399_2)"
								/>
							</g>
							<defs>
								<linearGradient
									id="paint0_linear_399_2"
									x1="24"
									y1="0"
									x2="24"
									y2="48"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#F9B992" />
									<stop offset="0.328125" stopColor="#EFAE89" />
									<stop offset="0.692708" stopColor="#BF7A56" />
									<stop offset="1" stopColor="#BA6D45" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_399_2"
									x1="19.2"
									y1="12"
									x2="19.2"
									y2="34.08"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#F9B992" />
									<stop offset="0.328125" stopColor="#EFAE89" />
									<stop offset="0.692708" stopColor="#BF7A56" />
									<stop offset="1" stopColor="#BA6D45" />
								</linearGradient>
								<clipPath id="clip0_399_2">
									<rect width="48" height="48" fill="white" transform="matrix(-1 0 0 1 48 0)" />
								</clipPath>
							</defs>
						</svg>
						{recipe.total_cooking_time}
					</p>
				</div>
				<div className={styles.minorInfo}>
					<p className={styles.minorInfoItem}>
						{`Количество положительных оценок: ${recipe.score_number}`}{" "}
						<svg
							width="16"
							height="16"
							viewBox="0 0 35 35"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M35 13.9357C35 13.4168 34.6075 13.0943 33.8218 12.968L23.2633 11.4328L18.5308 1.86226C18.2645 1.28732 17.9207 1 17.5001 1C17.0796 1 16.736 1.28732 16.4695 1.86226L11.7368 11.4328L1.17773 12.968C0.392675 13.0943 0 13.4168 0 13.9357C0 14.2303 0.175341 14.5668 0.525949 14.9454L8.1823 22.3913L6.37341 32.908C6.34535 33.1044 6.33142 33.2451 6.33142 33.3289C6.33142 33.6233 6.40495 33.8721 6.55214 34.0756C6.69927 34.2794 6.91999 34.3808 7.21461 34.3808C7.46716 34.3808 7.74748 34.297 8.05595 34.1286L17.4999 29.1641L26.9445 34.1286C27.2395 34.297 27.5199 34.3808 27.7855 34.3808C28.0669 34.3808 28.2803 34.2794 28.4274 34.0756C28.5742 33.8724 28.6478 33.6233 28.6478 33.3289C28.6478 33.1468 28.6407 33.0066 28.6267 32.908L26.8176 22.3913L34.4528 14.9454C34.818 14.5808 35 14.2441 35 13.9357Z"
								fill="white"
							/>
						</svg>
					</p>
					<p
						className={styles.minorInfoItem}
					>{`Создан: ${new Date(recipe.creation_date).toLocaleDateString("ru-RU")}`}</p>
				</div>
				<Text className={styles.description}>{recipe.description}</Text>
				<div className={styles.ingTable}>
					<RecipeTitle text={"Ингредиенты"}>
						{" "}
						<svg
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_400_22)">
								<path
									d="M32.9192 24.5184C32.6397 23.2146 31.4284 16.3265 30.5909 11.6716C29.7525 7.01674 28.6372 2.96708 27.8442 1.10513C27.053 -0.756827 25.005 0.174991 22.4452 0.733072C19.8846 1.29199 16.441 1.61775 10.6691 3.20024C4.8981 4.78274 2.94356 5.94604 1.63969 6.78442C0.336656 7.62196 0.988171 9.25159 1.1742 9.76338C1.36023 10.2752 3.19524 15.3787 3.87369 18.1413C4.52521 20.7945 7.2247 29.9174 8.01595 32.3374C8.8072 34.7583 10.5766 33.9671 12.3451 33.4545C14.1144 32.9435 16.9065 32.1506 20.1649 31.3139C23.4234 30.4755 26.4486 30.3829 28.3569 30.1034C30.2651 29.824 30.8695 29.0336 32.1725 28.3341C33.4764 27.6354 33.1986 25.8215 32.9192 24.5184ZM31.1489 26.8922C30.2643 27.5891 29.101 28.2415 25.7491 28.7061C22.3989 29.1725 19.5117 29.5437 16.8122 30.2886C14.1128 31.0344 12.9957 31.6851 11.8787 31.9637C10.7617 32.2432 9.83076 32.8484 9.31814 31.3585C8.80551 29.8678 4.29289 14.3703 3.5008 12.1363C3.09339 10.9848 1.82487 8.5521 3.12874 7.90058C4.43346 7.24991 7.13295 5.71371 12.3922 4.41068C17.6523 3.10765 22.2601 2.3627 23.6102 2.03779C24.9604 1.71119 26.6818 1.15311 26.9612 2.50327C27.2407 3.85344 28.6372 10.3231 30.1262 17.7693C31.6153 25.2162 32.0336 26.1935 31.1489 26.8922ZM9.45955 12.6489C9.45955 12.6489 10.9495 12.1371 11.6473 11.8577C12.3451 11.579 11.2281 9.01843 11.042 8.36691C10.856 7.71624 10.2971 7.29705 9.22723 7.6691C8.15652 8.04115 6.388 8.50664 5.78278 8.73896C5.17757 8.97129 6.10854 11.3922 6.66746 12.5563C7.22555 13.7196 8.24911 12.9747 9.45955 12.6489ZM7.03952 11.0656C6.91831 10.3896 6.20198 9.53021 6.89979 9.34418C7.59844 9.15731 9.22723 8.87785 9.60012 8.73812C9.97218 8.59923 10.2979 8.59923 10.484 9.34418C10.67 10.0891 11.1826 11.0193 10.6237 11.2524C10.0648 11.4856 9.50669 11.7642 8.71544 11.9974C7.9242 12.2305 7.27184 12.3694 7.03952 11.0656ZM11.8341 22.0976C11.4149 22.1901 9.92504 22.5167 9.22723 22.7962C8.52858 23.0757 9.27689 24.5942 9.36696 24.9368C9.83245 26.7061 10.3914 26.7524 10.7171 26.7061C11.0429 26.659 11.9276 26.4267 12.9511 26.1009C13.9755 25.7752 13.2306 24.5184 12.9048 23.308C12.5782 22.0976 12.2525 22.005 11.8341 22.0976ZM12.2062 25.2162C11.787 25.308 11.3686 25.542 11.0429 25.6354C10.7171 25.7272 10.4377 25.8669 10.2053 24.5184C10.1481 24.1843 9.87959 23.9132 10.2516 23.7735C10.6237 23.6337 11.1826 23.446 11.4149 23.446C11.6481 23.446 11.9739 23.446 12.1136 23.9132C12.2525 24.3787 12.6254 25.1236 12.2062 25.2162ZM28.3097 18.8863C27.7988 18.5605 26.7272 19.026 25.4705 19.3534C24.2146 19.6792 23.0976 19.8635 21.3282 20.1901C19.5589 20.5167 16.7197 21.2146 15.9764 21.3543C15.2323 21.494 15.6001 22.7827 15.6506 23.4031C15.8367 25.6834 17.3729 24.7533 21.0496 23.9612C24.7272 23.1708 25.5193 22.8442 27.521 22.5184C29.5218 22.1927 28.8712 21.0277 28.824 20.6085C28.7769 20.1893 28.8232 19.212 28.3097 18.8863ZM27.6119 21.2129C27.101 21.3526 25.6582 21.5849 23.7963 22.0976C21.9335 22.6085 20.585 23.122 18.8628 23.3543C17.1405 23.5858 16.489 23.7735 16.489 23.494C16.489 23.2146 16.4427 22.6085 16.4427 22.6085C16.5824 22.5614 17.6995 22.377 19.7474 21.8189C21.7963 21.26 24.4023 20.7482 25.7053 20.4225C27.0084 20.0967 27.707 19.771 27.7996 20.2356C27.8914 20.7019 28.1245 21.074 27.6119 21.2129ZM20.1186 16.606C22.1666 16.0007 26.9133 15.1161 27.8451 14.8366C28.7769 14.5571 28.59 13.5336 28.3106 12.7423C28.0311 11.9511 27.8914 11.5319 27.0075 11.6253C26.1237 11.7188 24.1683 12.1843 21.3762 12.7895C18.5833 13.3947 15.9301 13.9528 15.0463 14.1851C14.1616 14.4174 14.702 15.4772 14.7205 16.3265C14.766 18.5134 18.0707 17.2095 20.1186 16.606ZM15.6043 15.9065C15.6043 15.7592 15.3249 15.2558 15.7441 15.2558C16.1633 15.2558 18.3973 14.7895 19.9798 14.2785C21.5622 13.7667 24.2154 13.3476 25.3316 13.0218C26.4486 12.6952 27.2862 12.1371 27.3804 12.6497C27.4722 13.1615 27.7062 13.6741 27.3333 13.7667C26.9621 13.8593 23.7491 14.1388 21.7474 14.7903C19.7457 15.4418 17.6978 16.0007 17.0471 16.2802C16.3956 16.5588 15.6043 16.7912 15.6043 15.9065ZM9.97218 19.6775C10.7634 19.4906 11.4621 19.1186 12.4856 18.7928C13.5092 18.4662 12.718 16.6514 12.3922 15.5816C12.0665 14.5117 11.0892 14.6043 10.1582 14.744C9.22723 14.8837 7.83076 15.4418 7.41157 15.5816C6.99238 15.7213 7.77016 17.574 7.87706 18.0487C8.38885 20.3282 9.18009 19.8635 9.97218 19.6775ZM8.76174 17.6758C8.65147 17.1422 7.8779 16.4191 8.48228 16.3257C9.08666 16.2322 9.50585 15.9536 10.4368 15.8139C11.3678 15.6742 11.4612 15.4418 11.5538 16.2331C11.6473 17.0226 12.159 18.0024 11.4612 18.1413C10.7626 18.2811 10.4368 18.3736 9.87874 18.5605C9.31982 18.7465 9.0412 19.026 8.76174 17.6758ZM18.4427 9.53021C20.4444 8.97129 23.7954 8.69267 25.5176 8.36607C27.2399 8.04031 26.308 6.50496 25.9831 5.62028C25.6574 4.7356 25.6111 4.82903 24.4932 4.87533C23.3771 4.92162 21.1431 5.34082 19.234 5.71287C17.3249 6.08492 13.8341 7.0159 13.1835 7.29536C12.5319 7.57482 13.0488 8.64974 13.1363 9.24991C13.4621 11.4839 14.1144 11.0647 14.8122 10.7398C15.5109 10.4149 16.4419 10.0891 18.4427 9.53021ZM13.8813 9.11102C13.8813 9.11102 13.4158 8.41321 13.9284 8.41321C14.4402 8.41321 15.0917 8.08745 15.8367 7.80799C16.5816 7.52853 18.8156 7.15647 20.1658 6.78358C21.516 6.41152 22.9587 6.2255 23.936 6.03863C24.9124 5.8526 24.8661 5.57314 25.0993 6.03863C25.3308 6.50496 25.3787 6.87617 24.6801 7.24907C23.9823 7.62196 22.9587 7.57566 20.7693 8.08745C18.5808 8.59923 18.3021 8.5058 16.7197 9.06472C15.1388 9.62364 14.0681 10.5075 13.8813 9.11102Z"
									fill="url(#paint0_linear_400_22)"
								/>
							</g>
							<defs>
								<linearGradient
									id="paint0_linear_400_22"
									x1="16.9999"
									y1="0"
									x2="16.9999"
									y2="33.9995"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#F9B992" />
									<stop offset="0.328125" stop-color="#EFAE89" />
									<stop offset="0.692708" stop-color="#BF7A56" />
									<stop offset="1" stop-color="#BA6D45" />
								</linearGradient>
								<clipPath id="clip0_400_22">
									<rect width="34" height="34" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</RecipeTitle>
					<ul>
						{data?.map((ingredient) => (
							<IngredientLI
								key={ingredient.name}
								name={ingredient.name}
								notation={ingredient.notation}
								quantity={ingredient.quantity}
							/>
						))}
					</ul>
				</div>
				<div className={styles.addInfoTable}>
					<RecipeTitle text={"Дополнительная информация"}>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_404_46)">
								<path
									d="M26 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V8H4V10H6V15H4V17H6V22H4V24H6V28C6 28.5304 6.21071 29.0391 6.58579 29.4142C6.96086 29.7893 7.46957 30 8 30H26C26.5304 30 27.0391 29.7893 27.4142 29.4142C27.7893 29.0391 28 28.5304 28 28V4C28 3.46957 27.7893 2.96086 27.4142 2.58579C27.0391 2.21071 26.5304 2 26 2ZM26 28H8V24H10V22H8V17H10V15H8V10H10V8H8V4H26V28Z"
									fill="url(#paint0_linear_404_46)"
								/>
								<path d="M22 8H14V10H22V8Z" fill="url(#paint1_linear_404_46)" />
								<path d="M22 15H14V17H22V15Z" fill="url(#paint2_linear_404_46)" />
								<path d="M22 22H14V24H22V22Z" fill="url(#paint3_linear_404_46)" />
							</g>
							<defs>
								<linearGradient
									id="paint0_linear_404_46"
									x1="16"
									y1="2"
									x2="16"
									y2="30"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#F9B992" />
									<stop offset="0.328125" stop-color="#EFAE89" />
									<stop offset="0.692708" stop-color="#BF7A56" />
									<stop offset="1" stop-color="#BA6D45" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_404_46"
									x1="18"
									y1="8"
									x2="18"
									y2="10"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#F9B992" />
									<stop offset="0.328125" stop-color="#EFAE89" />
									<stop offset="0.692708" stop-color="#BF7A56" />
									<stop offset="1" stop-color="#BA6D45" />
								</linearGradient>
								<linearGradient
									id="paint2_linear_404_46"
									x1="18"
									y1="15"
									x2="18"
									y2="17"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#F9B992" />
									<stop offset="0.328125" stop-color="#EFAE89" />
									<stop offset="0.692708" stop-color="#BF7A56" />
									<stop offset="1" stop-color="#BA6D45" />
								</linearGradient>
								<linearGradient
									id="paint3_linear_404_46"
									x1="18"
									y1="22"
									x2="18"
									y2="24"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#F9B992" />
									<stop offset="0.328125" stop-color="#EFAE89" />
									<stop offset="0.692708" stop-color="#BF7A56" />
									<stop offset="1" stop-color="#BA6D45" />
								</linearGradient>
								<clipPath id="clip0_404_46">
									<rect width="32" height="32" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</RecipeTitle>
					<div className={styles.addInfoContent}>
						<ul className={styles.addInfoColumn}>
							{addInfo.slice(0, 3).map((item) => (
								<RecipeAddInfo key={item.name} name={item.name} value={item.value} />
							))}
						</ul>
						<ul className={styles.addInfoColumn}>
							{addInfo.slice(3, 6).map((item) => (
								<RecipeAddInfo key={item.name} name={item.name} value={item.value} />
							))}
						</ul>
					</div>
				</div>
				<p>Пошаговая готовка</p>
				<p className={styles.enjoy}>Приятного аппетита!</p>
				<div className={styles.comments}></div>
				<Comments id={id} />
			</div>
		);
	}
};

export default Recipe;
