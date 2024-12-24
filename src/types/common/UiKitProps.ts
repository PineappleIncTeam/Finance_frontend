import { ReactElement, ReactNode } from "react";

import { Control, FieldError, FieldErrorsImpl, Merge, UseControllerProps } from "react-hook-form";

import { ISignInForm, ISignUpForm } from "../components/ComponentsTypes";
import { INewPassword } from "../pages/Password";
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

export interface IAuthInput extends UseControllerProps<TAuthInputForm> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
}

export interface IAppInput extends UseControllerProps<TAppInputForm> {
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
