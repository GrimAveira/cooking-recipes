import bakes from "./bakes.png";
import desserts from "./desserts.png";
import broths from "./broths.png";
import soups from "./soups.png";
import drinks from "./drinks.png";
import snacks from "./snacks.png";
import vk from "./vk_icon.svg";
import github from "./github_icon.svg";
import bakesMinor from "./bakesMinor.png";
import dessertMinor from "./dessertMinor.png";
import brothsMinor from "./brothsMinor.png";
import soupMinor from "./soupMinor.png";
import drinkMinor from "./drinkMinor.png";
import snackMinor from "./snackMinor.png";
import cupcakeType from "./cupcakeType.svg";
import biscuitType from "./biscuitType.svg";
import recently from "./recently.svg";
import favorite from "./favorite.svg";

export const recipeOptions = { recently, favorite };

export const categoryCards = [
	{ img: bakes, url: "recipes/bakes", title: "Выпечка" },
	{ img: desserts, url: "recipes/desserts", title: "Десерты" },
	{ img: broths, url: "recipes/broths", title: "Бульоны" },
	{ img: soups, url: "recipes/soups", title: "Супы" },
	{ img: drinks, url: "recipes/drinks", title: "Напитки" },
	{ img: snacks, url: "recipes/snacks", title: "Закуски" },
];

export const titles = [
	{ title: "Избранное", url: "/bookmarks", isAuth: true },
	{ title: "Добавить рецепт", url: "/create", isAuth: true },
	{ title: "Личный кабинет", url: "/lk", isAuth: true },
	{ title: "О сайте", url: "/about", isAuth: false },
];

export const icons = [
	{ title: "Вконтакте", url: "https://vk.com/id187389901", svg: vk },
	{ title: "GitHub", url: "https://github.com/GrimAveira", svg: github },
];

interface SubTypesI {
	img: string;
	title: string;
	url: string;
}

export interface RECIPES_TYPES_I {
	background: string;
	title: string;
	subtypes?: SubTypesI[];
}

export const RECIPES_TYPES = new Map<string, RECIPES_TYPES_I>([
	[
		"bakes",
		{
			background: bakesMinor,
			title: "Выпечка",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
				{ img: biscuitType, title: "Пицца", url: "pizza" },
				{ img: cupcakeType, title: "Пироги", url: "cakes" },
				{ img: biscuitType, title: "Пирожки", url: "pies" },
				{ img: cupcakeType, title: "Хлеб", url: "bread" },
			],
		},
	],
	[
		"biscuits",
		{
			background: bakesMinor,
			title: "Печенье",
		},
	],
	[
		"cupcakes",
		{
			background: bakesMinor,
			title: "Кексы",
		},
	],
	[
		"pizza",
		{
			background: bakesMinor,
			title: "Пиццы",
		},
	],
	[
		"cakes",
		{
			background: bakesMinor,
			title: "Пироги",
		},
	],
	[
		"pies",
		{
			background: bakesMinor,
			title: "Пирожки",
		},
	],
	[
		"bread",
		{
			background: bakesMinor,
			title: "Хлеб",
		},
	],
	[
		"desserts",
		{
			background: dessertMinor,
			title: "Десерты",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
				{ img: biscuitType, title: "Варенье", url: "jam" },
				{ img: cupcakeType, title: "Кремы", url: "cream" },
			],
		},
	],
	[
		"biscuits",
		{
			background: dessertMinor,
			title: "Печенье",
		},
	],
	[
		"cupcakes",
		{
			background: dessertMinor,
			title: "Кексы",
		},
	],
	[
		"jam",
		{
			background: dessertMinor,
			title: "Варенье",
		},
	],
	[
		"cream",
		{
			background: dessertMinor,
			title: "Кремы",
		},
	],
	[
		"broths",
		{
			background: brothsMinor,
			title: "Бульоны",
			subtypes: [
				{ img: biscuitType, title: "Грибной", url: "mushroom" },
				{ img: cupcakeType, title: "Овощной", url: "vegetable" },
				{ img: biscuitType, title: "Мясной", url: "meat" },
			],
		},
	],
	[
		"mushroom",
		{
			background: brothsMinor,
			title: "Грибной",
		},
	],
	[
		"vegetable",
		{
			background: brothsMinor,
			title: "Овощной",
		},
	],
	[
		"meat",
		{
			background: brothsMinor,
			title: "Мясной",
		},
	],
	[
		"soups",
		{
			background: soupMinor,
			title: "Супы",
			subtypes: [
				{ img: biscuitType, title: "Крем-суп", url: "cream-soup" },
				{ img: cupcakeType, title: "Пюреобразный", url: "mash" },
				{ img: biscuitType, title: "Холодный", url: "cold" },
			],
		},
	],
	[
		"cream-soup",
		{
			background: soupMinor,
			title: "Крем-суп",
		},
	],
	[
		"mash",
		{
			background: soupMinor,
			title: "Пюреобразный",
		},
	],
	[
		"cold",
		{
			background: soupMinor,
			title: "Холодный",
		},
	],
	[
		"drinks",
		{
			background: drinkMinor,
			title: "Напитки",
			subtypes: [
				{ img: biscuitType, title: "Чай", url: "tea" },
				{ img: cupcakeType, title: "Сок", url: "juice" },
			],
		},
	],
	[
		"tea",
		{
			background: drinkMinor,
			title: "Чай",
		},
	],
	[
		"juice",
		{
			background: drinkMinor,
			title: "Сок",
		},
	],
	[
		"snacks",
		{
			background: snackMinor,
			title: "Закуски",
			subtypes: [{ img: biscuitType, title: "Жаренное", url: "fried" }],
		},
	],
	[
		"fried",
		{
			background: snackMinor,
			title: "Жаренное",
		},
	],
]);

export const TYPES_TRANSLATE_ENG_RU = new Map<string, string>([
	["bakes", "Выпечка"],
	["desserts", "Десерты"],
	["snacks", "Закуски"],
	["drinks", "Напитки"],
	["soups", "Супы"],
	["broths", "Бульоны"],
	["biscuits", "Печенье"],
	["cupcakes", "Кексы"],
	["pizza", "Пицца"],
	["cakes", "Пироги"],
	["pies", "Пирожки"],
	["bread", "Хлеб"],
	["jam", "Варенье"],
	["cream", "Кремы"],
	["mushroom", "Грибной"],
	["vegetable", "Овощной"],
	["meat", "Мясной"],
	["cream-soup", "Крем-суп"],
	["mash", "Пюреобразный"],
	["cold", "Холодный"],
	["tea", "Чай"],
	["juice", "Сок"],
	["fried", "Жаренное"],
]);
export const TYPES_TRANSLATE_RU_ENG = new Map<string, string>([
	["Выпечка", "bakes"],
	["Десерты", "desserts"],
	["Закуски", "snacks"],
	["Напитки", "drinks"],
	["Супы", "soups"],
	["Бульоны", "broths"],
	["Печенье", "biscuits"],
	["Кексы", "cupcakes"],
	["Пицца", "pizza"],
	["Пироги", "cakes"],
	["Пирожки", "pies"],
	["Хлеб", "bread"],
	["Варенье", "jam"],
	["Кремы", "cream"],
	["Грибной", "mushroom"],
	["Овощной", "vegetable"],
	["Мясной", "meat"],
	["Крем-суп", "cream-soup"],
	["Пюреобразный", "mash"],
	["Холодный", "cold"],
	["Чай", "tea"],
	["Сок", "juice"],
	["Жаренное", "fried"],
]);

export const hostIp = "192.168.0.105";
//192.168.0.106
//10.60.14.170 internet?
//192.168.14.163
//192.168.56.1
//localhost
//10.60.14.170
//10.60.14.170
