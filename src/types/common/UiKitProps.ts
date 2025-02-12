import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

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

type TButtonStyle = "contained" | "outlined";
type TButtonSize = "L" | "M" | "S" | "XS";

export interface IDefaultButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit";
	size?: TButtonSize;
	variant: TButtonStyle;
	children?: ReactNode;
}

export interface IAppButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit";
	children?: ReactNode;
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

export interface ICustomHeaderInputDate {
	date: Date;
	changeYear: (year: number) => void;
	changeMonth: (month: number) => void;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	decreaseYear: () => void;
	increaseYear: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
	prevYearButtonDisabled: boolean;
	nextYearButtonDisabled: boolean;
}

export interface IInputDateSelector {
	options?: number[] | string[];
	value: number;
	changeDate: (date: number) => void;
	isMonth?: boolean
}

export interface ICustomInputDate<T extends TAppInputForm> {
	isPeriod?: boolean;
	control?: Control<T>;
	name: Path<T>;
}