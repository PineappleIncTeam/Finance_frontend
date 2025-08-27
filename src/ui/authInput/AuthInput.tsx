import React, { useState, useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import { useController } from "react-hook-form";
import { passwordStrength } from "check-password-strength";

import { InputTypeList } from "../../helpers/Input";
import { defaultOptions } from "../../helpers/passwordStrengthOption";
import { TAuthInputForm, IAuthInput } from "../../types/common/UiKitProps";
import showPassword from "../../assets/pages/signUp/showPassword.svg";
import { errorPasswordStrengthMedium, errorPasswordStrengthStrong } from "../../helpers/authConstants";

import styles from "./AuthInput.module.scss";

const AuthInput = ({ label, type, placeholder, autoComplete, subtitle, error, ...props }: IAuthInput) => {
	const { field, fieldState } = useController<TAuthInputForm>(props);
	const [passwordType, setPasswordType] = useState<InputTypeList>(InputTypeList.Password);
	const [isMediumPassword, setIsMediumPassword] = useState<boolean>(false);
	const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);
	const togglePasswordVisibility = () =>
		setPasswordType(passwordType === InputTypeList.Password ? InputTypeList.Text : InputTypeList.Password);

	useEffect(() => {
		if (type === InputTypeList.Password && field.value && typeof field.value === "string") {
			try {
				const result = passwordStrength(field.value, defaultOptions);
				setIsMediumPassword(result.value === "Medium");
				setIsStrongPassword(result.value === "Strong");
				// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			} catch (error: unknown) {
				setIsMediumPassword(false);
				setIsStrongPassword(false);
			}
		}
	}, [field.value, type]);

	const value = typeof field.value === "boolean" ? String(field.value) : field.value;

	return (
		<div className={styles.inputWrap}>
			<label className={styles.inputWrap__label}>{label}</label>
			<div className={cn(styles.inputWrap__element, { [styles.inputWrap__element_error]: error })}>
				<input
					{...field}
					type={type === InputTypeList.Password ? passwordType : type}
					placeholder={placeholder}
					name={props.name}
					className={styles.inputWrap__input}
					autoComplete={autoComplete}
					value={value}
				/>
				{type === InputTypeList.Password && (
					<button
						onClick={togglePasswordVisibility}
						className={styles.inputWrap__passwordEye}
						type={InputTypeList.Button}>
						<Image src={showPassword} alt="Toggle visibility" />
					</button>
				)}
			</div>
			{fieldState.error && <p className={styles.inputWrap__error}>{fieldState.error.message || (error as string)}</p>}

			{!fieldState.error && !error && isMediumPassword && (
				<p className={cn(styles.inputWrap__subtitle, styles.inputWrap__subtitle_green)}>
					{errorPasswordStrengthMedium}
				</p>
			)}
			{!fieldState.error && !error && isStrongPassword && (
				<p className={cn(styles.inputWrap__subtitle, styles.inputWrap__subtitle_green)}>
					{errorPasswordStrengthStrong}
				</p>
			)}

			{subtitle && !error && <p className={styles.inputWrap__subtitle}>{subtitle}</p>}
		</div>
	);
};

export default AuthInput;
