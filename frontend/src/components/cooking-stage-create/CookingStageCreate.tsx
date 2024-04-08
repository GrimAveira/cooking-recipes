import { ICookingStage } from "../../interfaces/index";
import BasicInput from "../basic-input/BasicInput";
import styles from "./CookingStageCreate.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement>, ICookingStage {
	setCookingStages: React.Dispatch<React.SetStateAction<ICookingStage[]>>;
	stageId: number;
}

function CookingStageCreate(props: IProps) {
	const { stageId, stageTitle, setCookingStages, description } = props;

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
				pattern="^[\\W]{1,30}$"
				title="Не должно привешать порог в 30 символов"
				required={true}
			/>
			<textarea value={description} onChange={changeDescriptionHandler} maxLength={200} />
			<button type="button" onClick={removeStage}>
				Del
			</button>
		</div>
	);
}

export default CookingStageCreate;
