"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import Link from "next/link";

import { ISignInForm } from "../../../types/components/ComponentsTypes";
import Button from "../../../ui/button/button";
import Input from "../../../ui/input/Input";
import Title from "../../../ui/title/Title";
import { emailPattern, passwordPattern } from "../../../helpers/authConstants";
import { formHelpers } from "../../../utils/formHelpers";
import { InputType } from "../../../helpers/Input";
import { MainPath, UserProfilePath } from "../../../services/router/routes";
import { ApiResponseCode } from "../../../helpers/apiResponseCode";

import CustomCheckbox from "../../../ui/checkBox/checkBox";
import { loginUser } from "../../../services/api/auth/Login";

import styles from "./signInForm.module.scss";

const SignInForm = () => {
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm<ISignInForm>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
		delayError: 200,
	});

	const router = useRouter();

	const isAxiosError = (error: unknown): error is AxiosError => {
		return (error as AxiosError).isAxiosError !== undefined;
	};

	const onSubmit = async (data: ISignInForm) => {
		try {
			await loginUser(data);
			router.push(UserProfilePath.Profit);
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= ApiResponseCode.SERVER_ERROR_STATUS_MIN &&
				error.response.status < ApiResponseCode.SERVER_ERROR_STATUS_MAX
			) {
				return router.push(MainPath.ServerError);
			}
			return router.push(MainPath.NotFound);
		}
	};

	return (
		<form className={styles.signInFormWrap} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.signInFormContainer}>
				<Title title={"Вход"} />
				<Input
					control={control}
					label={"Введите почту"}
					type="email"
					placeholder="_@_._"
					name={"email"}
					error={formHelpers.getEmailError(errors)}
					rules={{ required: true, pattern: emailPattern }}
				/>
				<Input
					label={"Введите пароль"}
					type={InputType.Password}
					placeholder="Пароль"
					error={formHelpers.getPasswordError(errors, control._formValues.password)}
					name={"password"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
				/>
				<div className={styles.additionalFunctionsWrap}>
					<div className={styles.additionalFunctionsWrap__checkbox}>
						<CustomCheckbox />
						<p className={styles.checkBoxText}>Запомнить меня</p>
					</div>
					<Link href={""} className={styles.forgetPassword}>
						Забыли пароль?
					</Link>
				</div>
				<Button content="Вход" styleName="big buttonForLogin" type="submit" />
				<div className={styles.dividerWrap}>
					<div className={styles.dividerWrap__line} />
					<span className={styles.dividerWrap__subtitle}>или</span>
					<div className={styles.dividerWrap__line} />
				</div>
				<p className={styles.signInFormContainer__auth}>
					Войти через{" "}
					<a
						href="https://vk.com/"
						rel="nofollow noreferrer"
						target="_blank"
						className={styles.signInFormContainer__auth_link}>
						Вконтакте
					</a>
				</p>
			</div>
		</form>
	);
};

export default SignInForm;
