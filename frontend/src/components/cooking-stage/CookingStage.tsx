import { ICookingStage } from "../../interfaces/index";
// import { getImageSize } from "react-image-size";
import BasicInput from "../basic-input/BasicInput";
// import { promiseFail } from "../../functions/toastTrigger";

interface IProps extends React.HTMLAttributes<HTMLDivElement>, ICookingStage {
	setCookingStages: React.Dispatch<React.SetStateAction<ICookingStage[]>>;
	stageId: number;
}

function CookingStage(props: IProps) {
	const { stageId, stageTitle, setCookingStages, description } = props;

	// const changeHandlerImage = async (event: ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.files) {
	// 		const file = event.target.files[0];
	// 		const imageUrl = URL.createObjectURL(file);
	// 		const { width, height } = await getImageSize(imageUrl);
	// 		if (width > 1150 && width < 1250 && height > 700 && height < 900) {
	// 			const formData = new FormData();
	// 			formData.append("file", file);
	// 			setCookingStages((cookingStages) => {
	// 				return cookingStages.map((stage) =>
	// 					stage.stageId === stageId ? { ...stage, image: formData } : stage,
	// 				);
	// 			});
	// 		} else {
	// 			event.target.value = "";
	// 			promiseFail("Картинка неправильного размера");
	// 		}
	// 	}
	// };

	const removeStage = () => {
		setCookingStages((cookingStages) => {
			return cookingStages.filter((stage) => stage.stageId !== stageId);
		});
	};

	const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCookingStages((cookingStages) => {
			const newCookingStages = [...cookingStages];
			newCookingStages[Number(stageId)].stageTitle = event.target.value;
			return newCookingStages;
		});
	};
	const changeDescriptionHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setCookingStages((cookingStages) => {
			const newCookingStages = [...cookingStages];
			newCookingStages[Number(stageId)].description = event.target.value;
			return newCookingStages;
		});
	};

	return (
		<div>
			<p>{props.title}</p>
			<BasicInput
				value={stageTitle}
				changeHandler={changeTitleHandler}
				label="Название этапа"
				pattern="[а-яА-Я0-9 ]*"
				title=""
				required={true}
			/>
			{/* <input type="file" onChange={changeHandlerImage} name="image" required={true} title="" /> */}
			<textarea value={description} onChange={changeDescriptionHandler} />
			<button type="button" onClick={removeStage}>
				Del
			</button>
		</div>
	);
}

export default CookingStage;
