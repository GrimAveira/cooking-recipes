import { useState } from "react";
import Button from "../button/Button";
import styles from "./Comment.module.scss";

function Comment() {
	const [text, setText] = useState<string>("");

	const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	return (
		<form className={styles.container}>
			<textarea value={text} className={styles.textarea} onChange={changeHandler}></textarea>
			<Button className={styles.button} title="Оставить отзыв" type="submit" />
		</form>
	);
}

export default Comment;
