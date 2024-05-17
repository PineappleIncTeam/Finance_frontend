"use client";
import cn from "classnames";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { Button } from "../../../ui/button/Button";
import { Input } from "../../../ui/input/Input";
import { Title } from "../../../ui/title/Title";

import { emailPattern, errorPasswordRepeat, passwordPattern } from "../../../helpers/authConstants";

import { formHelpers } from "../../../utils/formHelpers";

import styles from "./SignUpForm.module.css";
export interface ISignUpForm {
	email: string;
	password: string;
	repeatPassword: string;
}

const SignUpForm = () => {
	const {
		formState: { errors },
		control,
		watch,
	} = useForm<ISignUpForm>({
		defaultValues: {
			email: "",
			password: "",
			repeatPassword: "",
		},
		mode: "all",
		delayError: 200,
	});

	const validateRepeatPassword = (value: string) => {
		const password = watch("password");
		return value === password || errorPasswordRepeat;
	};

	return (
		<form className={styles.signUpFormWrap}>
			<div className={styles.signUpFormContainer}>
				<Title title={"Регистрация"} />
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
					type="password"
					placeholder="Пароль"
					subtitle="Пароль должен состоять из 6 и более символов, среди которых хотя бы одна буква верхнего регистра и хотя бы одна цифра"
					error={formHelpers.getPasswordError(errors, control._formValues.password)}
					name={"password"}
					control={control}
					rules={{ required: true, pattern: passwordPattern }}
				/>
				<Input
					label={"Повторите пароль"}
					type="password"
					placeholder="Пароль"
					control={control}
					name={"repeatPassword"}
					error={errors.repeatPassword?.message}
					rules={{
						required: true,
						validate: validateRepeatPassword,
					}}
				/>
				<div className={styles.actionWrap}>
					<Button content="Отменить" styleName={cn("small", "buttonForRegistration")} />
					<Button content="Вход" styleName={cn("small", "buttonForLogin")} />
				</div>
				<div className={styles.dividerWrap}>
					<div className={styles.dividerWrap__line} />
					<span className={styles.dividerWrap__subtitle}>или</span>
					<div className={styles.dividerWrap__line} />
				</div>
				<p className={styles.signUpFormContainer__auth}>
					Войти через{" "}
					<Link href={"https://vk.com/"}>
						<span className={styles.signUpFormContainer__auth_link}>Вконтакте</span>
					</Link>
				</p>
			</div>
		</form>
	);
};

export default SignUpForm;
