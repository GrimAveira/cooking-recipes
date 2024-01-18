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

export interface translateI {
	background: string;
	title: string;
}

export const translates = new Map<string, translateI>([
	["bakes", { background: bakesMinor, title: "Выпечка" }],
	["desserts", { background: dessertMinor, title: "Дессерты" }],
	["broths", { background: brothsMinor, title: "Бульоны" }],
	["soups", { background: soupMinor, title: "Супы" }],
	["drinks", { background: drinkMinor, title: "Напитки" }],
	["snacks", { background: snackMinor, title: "Закуски" }],
]);
