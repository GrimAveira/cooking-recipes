import { useContext, useState } from "react";
import Button from "../button/Button";
import styles from "./Comment.module.scss";
import { useMutation } from "react-query";
import { ICommentAdd } from "../../interfaces";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";
import CommentService from "../../api/CommentService";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface ICommentForm {
	setActive: (flag: boolean) => void;
	refetch: () => void;
}

function Comment(props: ICommentForm) {
	const { setActive, refetch } = props;

	const [text, setText] = useState<string>("");

	const { id } = useParams();

	const { login } = useContext(AuthContext);

	const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 150) setText(event.target.value);
	};

	const mutationComment = useMutation({
		mutationFn: async (payload: ICommentAdd) => {
			return await CommentService.add(payload);
		},
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (id) {
			mutationComment.mutate({ description: text, recipe: id, user: login });
			setActive(false);
			refetch();
		}
	};

	return (
		<form className={styles.container} onSubmit={submitHandler}>
			<textarea value={text} className={styles.textarea} onChange={changeHandler} />
			<Button className={styles.button} title="Оставить отзыв" type="submit" />
		</form>
	);
}

export default Comment;
