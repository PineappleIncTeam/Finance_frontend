import React, { useState } from "react";
import { useController } from "react-hook-form";
import cn from "classnames";
import Image from "next/image";

import showPassword from "../../assets/pages/signUp/showPassword.svg";

import { IInputProps } from "../../types/common/UiKitProps";

import { ISignUpForm } from "../../types/components/ComponentsTypes";

import styles from "./Input.module.css";

export const Input = ({ label, type, placeholder, autoComplete, subtitle, error, ...props }: IInputProps) => {
	const { field, fieldState } = useController<ISignUpForm>(props);
	const [passwordType, setPasswordType] = useState("password");
	const togglePasswordVisibility = () => setPasswordType(passwordType === "password" ? "text" : "password");

	return (
		<div className={styles.inputWrap}>
			<label className={styles.inputWrap__label}>{label}</label>
			<div className={cn(styles.inputWrap__element, { [styles.inputWrap__element_error]: error })}>
				<input
					{...field}
					type={type === "password" ? passwordType : type}
					placeholder={placeholder}
					className={styles.inputWrap__input}
					autoComplete={autoComplete}
				/>
				{type === "password" && (
					<button onClick={togglePasswordVisibility} className={styles.inputWrap__passwordEye} type="button">
						<Image src={showPassword} alt="Toggle visibility" />
					</button>
				)}
			</div>
			{fieldState.error && <p className={styles.inputWrap__error}>{fieldState.error.message || error}</p>}
			{subtitle && !error && <p className={styles.inputWrap__subtitle}>{subtitle}</p>}
		</div>
	);
};
