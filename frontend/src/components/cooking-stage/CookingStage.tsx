import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { ICookingStageFetch } from "../../interfaces";
import "react-vertical-timeline-component/style.min.css";
import styles from "./CookingStage.module.scss";

function CookingStage(props: ICookingStageFetch) {
	const { description, title, order_number } = props;

	return (
		<VerticalTimelineElement
			contentStyle={{
				overflow: "hidden",
				position: "relative",
				background: "none",
				border: "2px solid #dc8d61",
				color: "#fff",
				padding: "0",
			}}
			contentArrowStyle={{ borderRight: "7px solid #dc8d61" }}
			dateClassName={styles.date}
			date={order_number}
			iconStyle={{ background: "#dc8d61", color: "#fff" }}
		>
			<div className={styles.blur} />
			<div className={styles.info}>
				<h1 className={`vertical-timeline-element-subtitle`}>{`${order_number}. ${title}`}</h1>
				<p className={styles.description}>{description}</p>
			</div>
		</VerticalTimelineElement>
	);
}

export default CookingStage;
