import { ReactElement, ReactNode } from "react";

import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, Path, PathValue, RegisterOptions, UseControllerProps } from "react-hook-form";

import { ISignInForm, ISignUpForm } from "../components/ComponentsTypes";
import { IChangePasswordForm, INewPassword } from "../pages/Password";
import { IExpensesInputForm, IExpensesSelectForm } from "../pages/Expenses";

export interface IButton {
	content: string | ReactNode;
	styleName: string;
	onClick?: () => void;
	type?: "button" | "submit";
	children?: ReactElement;
}

export type TAuthInputForm = ISignUpForm | ISignInForm | INewPassword;

export type TAppInputForm = IExpensesInputForm;

export type TChangePassForm = IChangePasswordForm;

export interface IAuthInput extends UseControllerProps<TAuthInputForm> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<TAuthInputForm>> | null;
}

export interface IAppInput<T extends FieldValues> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<T>> | null;
	control: Control<T>;
	name: Path<T>;
	rules?: Omit<RegisterOptions<T, Path<T>>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">;
	disabled?: boolean;
}

export interface IChangePassInput extends UseControllerProps<TChangePassForm> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<TChangePassForm>> | null;
}

export interface ITitle {
	title: string;
}

export interface ICustomCheckbox<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	rules?: RegisterOptions<T>;
}

export interface ISelect extends UseControllerProps<IExpensesSelectForm> {
	label?: string;
	options?: string[];
	disabled?: boolean;
}

export interface ISelector<T extends TAuthInputForm> {
	label?: string;
	options?: string[];
	disabled?: boolean;
	control?: Control<T>;
	placeholder?: string;
	name: Path<T>;
}

export interface IRadioButton<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	value: PathValue<T, Path<T>>;
	label: string;
}

export interface ISwitcher<T extends TAuthInputForm> {
	control?: Control<T>;
	name: Path<T>;
	label: string;
}

export type TAppInputValue = string | number | readonly string[] | undefined;
