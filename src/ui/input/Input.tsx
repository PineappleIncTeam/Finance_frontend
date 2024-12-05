import React, { useState } from "react";
import { useController } from "react-hook-form";
import cn from "classnames";
import Image from "next/image";

import { IInputFormProps, IInputProps } from "../../types/common/UiKitProps";

import { InputType } from "../../helpers/Input";

import showPassword from "../../assets/pages/signUp/showPassword.svg";

import styles from "./Input.module.scss";

const Input = ({ label, type, placeholder, autoComplete, subtitle, error, ...props }: IInputProps) => {
	const { field, fieldState } = useController<IInputFormProps>(props);
	const [passwordType, setPasswordType] = useState<InputType>(InputType.Password);
	const togglePasswordVisibility = () =>
		setPasswordType(passwordType === InputType.Password ? InputType.Text : InputType.Password);

	const value = typeof field.value === "boolean" ? String(field.value) : field.value;

	return (
		<div className={styles.inputWrap}>
			<label className={styles.inputWrap__label}>{label}</label>
			<div className={cn(styles.inputWrap__element, { [styles.inputWrap__element_error]: error })}>
				<input
					{...field}
					type={type === InputType.Password ? passwordType : type}
					placeholder={placeholder}
					className={styles.inputWrap__input}
					autoComplete={autoComplete}
					value={value}
				/>
				{type === InputType.Password && (
					<button onClick={togglePasswordVisibility} className={styles.inputWrap__passwordEye} type="button">
						<Image src={showPassword} alt="Toggle visibility" />
					</button>
				)}
			</div>
			{fieldState.error && <p className={styles.inputWrap__error}>{fieldState.error.message || (error as string)}</p>}
			{subtitle && !error && <p className={styles.inputWrap__subtitle}>{subtitle}</p>}
		</div>
	);
};

export default Input;
