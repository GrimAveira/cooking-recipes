import { useQuery } from "react-query";
import { VerticalTimeline } from "react-vertical-timeline-component";
import CookingStageService from "../../api/CookingStageService";
import Loader from "../loader/Loader";
import CookingStage from "../cooking-stage/CookingStage";
import styles from "./CookingStages.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	recipeID: string;
}

function CookingStages(props: IProps) {
	const { recipeID, ...remainProps } = props;

	const {
		isLoading,
		isError,
		data: cookingStages,
	} = useQuery({
		queryKey: ["cookingStages", recipeID],
		queryFn: () => {
			return CookingStageService.getByRecipe(recipeID);
		},
	});

	if (isLoading) return <Loader />;

	if (isError) return <div>Error</div>;

	return (
		<div {...remainProps} className={styles.container}>
			<VerticalTimeline>
				{cookingStages
					?.sort((a, b) => {
						return Number(a.order_number) - Number(b.order_number);
					})
					.map((stage) => {
						return <CookingStage key={stage.id} {...stage} />;
					})}
			</VerticalTimeline>
		</div>
	);
}

export default CookingStages;
