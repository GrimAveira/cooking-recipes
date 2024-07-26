import { ChangeEvent, useContext, useEffect, useState } from "react";
import UserService from "../../api/UserService";
import Button from "../../components/button/Button";
import ShellWrapper from "../../hoc/ShellWrapper";
import styles from "./LKRoute.module.scss";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery } from "react-query";
import InputLabel from "../../components/labelInput/InputLabel";
import Loader from "../../components/loader/Loader";
import CustomError from "../../components/custom-error/CustomError";
import { promiseFail, promiseSuccess } from "../../functions/toastTrigger";

const changeUserData = async (userData: {
	firstName: string;
	secondName: string;
	login: string;
}) => {
	return await UserService.updateData(userData);
};
const changeUserPassword = async (userData: {
	login: string;
	oldPassword: string;
	newPassword: string;
}) => {
	return await UserService.updatePassword(userData);
};

const LKRouteBase = () => {
	const { login } = useContext(AuthContext);

	const { isError, isLoading, data } = useQuery("userData", () => UserService.getInfo(login));

	console.log(data);

	const [userData, setUserData] = useState<{ firstName: string; secondName: string }>({
		firstName: "",
		secondName: "",
	});
	const [userPassword, setUserPassword] = useState<{ oldPassword: string; newPassword: string }>({
		oldPassword: "",
		newPassword: "",
	});

	const handlerUserData = (event: ChangeEvent<HTMLInputElement>) => {
		setUserData((state: { firstName: string; secondName: string }) => ({
			...state,
			[event.target.name]: event.target.value,
		}));
	};
	const handlerUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
		setUserPassword((state: { oldPassword: string; newPassword: string }) => ({
			...state,
			[event.target.name]: event.target.value,
		}));
	};

	const mutationUser = useMutation({
		mutationFn: changeUserData,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	const mutationUserPassword = useMutation({
		mutationFn: changeUserPassword,
		onSuccess(message: string) {
			promiseSuccess(message);
		},
		onError(message: string) {
			promiseFail(message);
		},
	});

	useEffect(() => {
		data &&
			setUserData((state: { firstName: string; secondName: string }) => ({
				...state,
				firstName: data.first_name,
				secondName: data.second_name,
			}));
	}, [data]);

	if (isLoading) return <Loader />;

	if (isError) return <CustomError description="Непредвиденная ошибка" />;

	if (data) {
		const inputs = [
			{
				label: { title: "Имя" },
				input: {
					name: "firstName",
					placeholder: "Введите имя",
					title: "Имя должно состоять из 1-30 букв и не может включать специальные символы",
					pattern: "^[А-Яа-я]{1,30}$",
					value: userData.firstName,
				},
			},
			{
				label: { title: "Фамилия" },
				input: {
					name: "secondName",
					placeholder: "Введите фамилию",
					title: "Фамилия должна состоять из 1-30 букв и не может включать специальные символы",
					pattern: "^[А-Яа-я]{1,30}$$",
					value: userData.secondName,
				},
			},
			{
				label: { title: "Старый пароль" },
				input: {
					name: "oldPassword",
					type: "password",
					placeholder: "Введите старый пароль",
					value: userPassword.oldPassword,
				},
			},
			{
				label: { title: "Новый пароль" },
				input: {
					name: "newPassword",
					type: "password",
					placeholder: "Введите новый пароль",
					value: userPassword.newPassword,
				},
			},
		];

		return (
			<div className={styles.container}>
				<h2>Личный кабинет</h2>
				<div className={styles.options}>
					<div className={styles.userContainer}>
						<svg
							width="50"
							height="50"
							viewBox="0 0 50 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.0002 25C29.6043 25 33.3335 21.2708 33.3335 16.6667C33.3335 12.0625 29.6043 8.33333 25.0002 8.33333C20.396 8.33333 16.6668 12.0625 16.6668 16.6667C16.6668 21.2708 20.396 25 25.0002 25ZM25.0002 29.1667C19.4377 29.1667 8.3335 31.9583 8.3335 37.5V41.6667H41.6668V37.5C41.6668 31.9583 30.5627 29.1667 25.0002 29.1667Z"
								fill="url(#paint0_linear_100_98)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_100_98"
									x1="25.0002"
									y1="8.33333"
									x2="25.0002"
									y2="41.6667"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#F9B992" />
									<stop offset="0.328125" stopColor="#EFAE89" />
									<stop offset="0.692708" stopColor="#BF7A56" />
									<stop offset="1" stopColor="#BA6D45" />
								</linearGradient>
							</defs>
						</svg>
						<p>
							<strong>{`${data.first_name} ${data.second_name}`}</strong>
						</p>
					</div>
					<form
						onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
							event.preventDefault();
							mutationUser.mutate({
								firstName: userData.firstName,
								secondName: userData.secondName,
								login,
							});
						}}
					>
						{inputs.slice(0, 2).map((inputLabel) => {
							return (
								<InputLabel
									key={inputLabel.label.title}
									className={styles.inputForm}
									label={{ title: inputLabel.label.title, fontSize: "18px" }}
									input={{
										...inputLabel.input,
										className: styles.input,
										onChange: handlerUserData,
										required: true,
									}}
								/>
							);
						})}
						<Button className={styles.button} title="Изменить данные" type="submit" />
					</form>
					<form
						onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
							event.preventDefault();
							mutationUserPassword.mutate({
								oldPassword: userPassword.oldPassword,
								newPassword: userPassword.newPassword,
								login,
							});
						}}
					>
						{inputs.slice(2, 4).map((inputLabel) => {
							return (
								<InputLabel
									key={inputLabel.label.title}
									className={styles.inputForm}
									label={{ title: inputLabel.label.title, fontSize: "18px" }}
									input={{
										...inputLabel.input,
										className: styles.input,
										onChange: handlerUserPassword,
										required: true,
									}}
								/>
							);
						})}
						<Button className={styles.button} title="Изменить пароль" type="submit" />
					</form>
				</div>
			</div>
		);
	}
	return <></>;
};
const LKRoute = () => ShellWrapper(LKRouteBase);
export default LKRoute;
