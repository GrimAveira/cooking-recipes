import styles from "./Comments.module.scss";
import Text from "../text/Text";
import UserInfo from "../user-info/UserInfo";
import RecipeTitle from "../recipe-title/RecipeTitle";
import { IComment } from "../../interfaces/index";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	comments: IComment[];
}

const Comments = (props: IProps) => {
	const { comments } = props;

	if (comments)
		return (
			<div className={styles.container}>
				<RecipeTitle className={styles.title} text={`Комментарии к рецепту (${comments.length})`}>
					{" "}
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 29.3334C11.6463 29.3334 11.3072 29.1929 11.0572 28.9429C10.8071 28.6928 10.6666 28.3537 10.6666 28.0001V24.0001H5.33329C4.62605 24.0001 3.94777 23.7191 3.44767 23.219C2.94758 22.7189 2.66663 22.0407 2.66663 21.3334V5.33341C2.66663 3.85341 3.86663 2.66675 5.33329 2.66675H26.6666C27.3739 2.66675 28.0521 2.9477 28.5522 3.4478C29.0523 3.94789 29.3333 4.62617 29.3333 5.33341V21.3334C29.3333 22.0407 29.0523 22.7189 28.5522 23.219C28.0521 23.7191 27.3739 24.0001 26.6666 24.0001H18.5333L13.6 28.9467C13.3333 29.2001 13 29.3334 12.6666 29.3334H12ZM13.3333 21.3334V25.4401L17.44 21.3334H26.6666V5.33341H5.33329V21.3334H13.3333ZM7.99996 9.33341H24V12.0001H7.99996V9.33341ZM7.99996 14.6667H20V17.3334H7.99996V14.6667Z"
							fill="url(#paint0_linear_406_52)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_406_52"
								x1="16"
								y1="2.66675"
								x2="16"
								y2="29.3334"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#F9B992" />
								<stop offset="0.328125" stopColor="#EFAE89" />
								<stop offset="0.692708" stopColor="#BF7A56" />
								<stop offset="1" stopColor="#BA6D45" />
							</linearGradient>
						</defs>
					</svg>
				</RecipeTitle>
				{comments.map(({ description, first_name, second_name }) => (
					<Text key={description} className={styles.comment} description={description}>
						<UserInfo first_name={first_name} second_name={second_name} />
					</Text>
				))}
			</div>
		);
};

export default Comments;
