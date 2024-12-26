import { useState } from "react";
import { useController } from "react-hook-form";

import cn from "classnames";

import Image from "next/image";

import { IChangePassInput, TChangePassForm } from "../../types/common/UiKitProps";
import { InputTypeList } from "../../helpers/Input";
import showPassword from "../../assets/pages/signUp/showPassword.svg";

import styles from "./ChangePassInput.module.scss";

const ChangePassInput = ({ label, type, placeholder, autoComplete, subtitle, error, ...props }: IChangePassInput) => {
	const { field, fieldState } = useController<TChangePassForm>(props);
	const [passwordType, setPasswordType] = useState<InputTypeList>(InputTypeList.Password);
	const togglePasswordVisibility = () =>
		setPasswordType(passwordType === InputTypeList.Password ? InputTypeList.Text : InputTypeList.Password);

	const value = typeof field.value === "boolean" ? String(field.value) : field.value;

	return (
		<div className={styles.inputWrap}>
			<label className={styles.inputWrap__label}>{label}</label>
			<div className={cn(styles.inputWrap__element, { [styles.inputWrap__element_error]: error })}>
				<input
					{...field}
					type={type === InputTypeList.Password ? passwordType : type}
					placeholder={placeholder}
					className={styles.inputWrap__input}
					autoComplete={autoComplete}
					value={value}
				/>
				{type === InputTypeList.Password && (
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

export default ChangePassInput;
