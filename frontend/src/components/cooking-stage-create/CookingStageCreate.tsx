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
		<div className={styles.container}>
			<p>{props.title}</p>
			<BasicInput
				className={styles.input}
				value={stageTitle}
				changeHandler={changeTitleHandler}
				label="Название этапа"
				pattern="^[а-яА-Я]{1,30}$"
				title="Не должно превышать порог в 30 символов"
				required={true}
			/>
			<textarea value={description} onChange={changeDescriptionHandler} maxLength={200} />
			<svg
				className={styles.delIng}
				type="button"
				onClick={removeStage}
				width="36"
				height="36"
				viewBox="0 0 36 36"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.11719 2.11768L32.0652 32.0657"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<path
					d="M31.7642 2.11768L2.11719 31.7647"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}

export default CookingStageCreate;
