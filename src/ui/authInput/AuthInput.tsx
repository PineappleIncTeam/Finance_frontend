import React, { useState, useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import { useController } from "react-hook-form";

import { passwordStrength } from "check-password-strength";

import { InputTypeList } from "../../helpers/Input";
import { defaultOptions } from "../../helpers/passwordStrengthOption";
import { TAuthInputForm, IAuthInput } from "../../types/common/UiKitProps";
import showPassword from "../../assets/pages/signUp/showPassword.svg";

import { 
	errorPasswordStrengthTooWeak,
    errorPasswordStrengthWeak,
	errorPasswordStrengthMedium,
	errorPasswordStrengthStrong,
} from "../../helpers/authConstants";

import styles from "./AuthInput.module.scss";

const AuthInput = ({ label, type, placeholder, autoComplete, subtitle, error, ...props }: IAuthInput) => {
	const { field, fieldState } = useController<TAuthInputForm>(props);
	const [passwordType, setPasswordType] = useState<InputTypeList>(InputTypeList.Password);
	
	const [currentPasswordStrengthText, setCurrentPasswordStrengthText] = useState<string | null>(null);
	
	const togglePasswordVisibility = () =>
		setPasswordType(passwordType === InputTypeList.Password ? InputTypeList.Text : InputTypeList.Password);

	useEffect(() => {
        if (type === InputTypeList.Password && field.value && typeof field.value === "string") {
            
                const result = passwordStrength(field.value, defaultOptions);
                let strengthMessage: string | null = null; 

                switch (result.value) {
                    case "Too weak":
                        strengthMessage = errorPasswordStrengthTooWeak;
                        break;
                    case "Weak":
                        strengthMessage = errorPasswordStrengthWeak;
                        break;
                    case "Medium":
                        strengthMessage = errorPasswordStrengthMedium;
                        break;
                    case "Strong":
                        strengthMessage = errorPasswordStrengthStrong; 
                        break;
                    default:
                        strengthMessage = null; 
                }
                setCurrentPasswordStrengthText(strengthMessage);
            
        } else {
            setCurrentPasswordStrengthText(null);
        }
    }, [field.value, type]); 

    const value = typeof field.value === "boolean" ? String(field.value) : field.value;

    let messageToDisplay: string | null = null;
    let messageClassName = "";

    if (fieldState.error) {
        messageToDisplay = fieldState.error.message || (error as string) || null;
        messageClassName = styles.inputWrap__error;
    } else if (type === InputTypeList.Password && currentPasswordStrengthText) {
        messageToDisplay = currentPasswordStrengthText;
        messageClassName = cn(
            styles.inputWrap__subtitle,
            styles.inputWrap__subtitle_green 
        );
    } else if (subtitle && !error) {
        messageToDisplay = subtitle;
        messageClassName = styles.inputWrap__subtitle; 
    }

    return (
        <div className={styles.inputWrap}>
            <label className={styles.inputWrap__label}>{label}</label>
            <div className={cn(styles.inputWrap__element, { [styles.inputWrap__element_error]: error || fieldState.error })}>
                <input
                    {...field}
                    type={type === InputTypeList.Password ? passwordType : type}
                    placeholder={placeholder}
                    className={styles.inputWrap__input}
                    autoComplete={autoComplete}
                    value={value}
                />
                {type === InputTypeList.Password && (
                    <button
                        onClick={togglePasswordVisibility}
                        className={styles.inputWrap__passwordEye}
                        type={InputTypeList.Button}>
                        <Image src={showPassword} alt="Переключить видимость" />
                    </button>
                )}
            </div>
            {}
            {messageToDisplay && <p className={messageClassName}>{messageToDisplay}</p>}
        </div>
    );
};

export default AuthInput;