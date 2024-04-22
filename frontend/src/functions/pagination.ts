export default function pagination<Type>(array: Type[]): Type[][] {
	const pagArray: Type[][] = [];
	let arrayIndex = -1;
	array.forEach((recipe, index) => {
		if (index % 12 == 0) {
			pagArray.push([recipe]);
			arrayIndex++;
		} else pagArray[arrayIndex].push(recipe);
	});
	return pagArray;
}
