import Comment from "../comment/Comment";
import styles from "./ModalComment.module.scss";

interface IModal {
	active: boolean;
	setActive: (flag: boolean) => void;
}

function ModalComment(props: IModal) {
	const { active, setActive } = props;

	return (
		<div
			className={`${styles.modal} ${active ? styles.modalActive : ""}`}
			onMouseDown={() => {
				setActive(false);
			}}
		>
			<div
				className={`${styles.modal__content} ${active ? styles.modal__contentActive : ""}`}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<Comment />
			</div>
		</div>
	);
}

export default ModalComment;
