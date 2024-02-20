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
	{ img: desserts, url: "recipes/desserts", title: "Дессерты" },
	{ img: broths, url: "recipes/broths", title: "Бульоны" },
	{ img: soups, url: "recipes/soups", title: "Супы" },
	{ img: drinks, url: "recipes/drinks", title: "Напитки" },
	{ img: snacks, url: "recipes/snacks", title: "Закуски" },
];

export const titles = [
	{ title: "ИЗБРАННОЕ", url: "favourites" },
	{ title: "ЛИЧНЫЙ КАБИНЕТ", url: "lk" },
	{ title: "О САЙТЕ", url: "about" },
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
		"desserts",
		{
			background: dessertMinor,
			title: "Дессерты",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"broths",
		{
			background: brothsMinor,
			title: "Бульоны",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"soups",
		{
			background: soupMinor,
			title: "Супы",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"drinks",
		{
			background: drinkMinor,
			title: "Напитки",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"snacks",
		{
			background: snackMinor,
			title: "Закуски",
			subtypes: [
				{ img: biscuitType, title: "Печенье", url: "biscuits" },
				{ img: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
]);

export const TYPES_TRANSLATE = new Map<string, string>([
	["bakes", "Выпечка"],
	["desserts", "Дессерты"],
	["snacks", "Закуски"],
	["drinks", "Напитки"],
	["soups", "Супы"],
	["broths", "Бульоны"],
	["biscuits", "Печенье"],
	["cupcakes", "Кексы"],
]);
