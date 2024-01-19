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
	background: string;
	title: string;
	url: string;
}

export interface TranslateI {
	background: string;
	title: string;
	subtypes: SubTypesI[];
}

export const matches = new Map<string, TranslateI>([
	[
		"bakes",
		{
			background: bakesMinor,
			title: "Выпечка",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"desserts",
		{
			background: dessertMinor,
			title: "Дессерты",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"broths",
		{
			background: brothsMinor,
			title: "Бульоны",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"soups",
		{
			background: soupMinor,
			title: "Супы",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"drinks",
		{
			background: drinkMinor,
			title: "Напитки",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
	[
		"snacks",
		{
			background: snackMinor,
			title: "Закуски",
			subtypes: [
				{ background: biscuitType, title: "Печенье", url: "biscuits" },
				{ background: cupcakeType, title: "Кексы", url: "cupcakes" },
			],
		},
	],
]);
