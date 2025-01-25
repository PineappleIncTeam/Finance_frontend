import { ReactElement, ReactNode } from "react";

import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, Path, UseControllerProps } from "react-hook-form";

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
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
}

export interface IAppInput<T extends FieldValues> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
	control: Control<T>;
	name: Path<T>;
	rules?: any;
	disabled?: boolean;
}

export interface IChangePassInput extends UseControllerProps<TChangePassForm> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
}

export interface ITitle {
	title: string;
}

export interface ICustomCheckbox {
	control: Control<any>;
	name: string;
	rules?: any;
}

export interface ISelect extends UseControllerProps<IExpensesSelectForm> {
	label?: string;
	options?: string[];
	disabled?: boolean;
}

export interface INewSelect<T extends TAuthInputForm> {
	label?: string;
	options?: string[];
	disabled?: boolean;
	control?: Control<T>;
	name: Path<T>;
}

export interface IRadioButton {
	control: Control<any>;
	name: string;
	value: string;
	label: string;
}

export interface ISwitcher<T extends TAuthInputForm> {
	control?: Control<T>;
	name: Path<T>;
	label: string;
}

export type TAppInputValue = string | number | readonly string[] | undefined;
