import { ReactNode } from "react";

import { FieldError, FieldErrorsImpl, Merge, UseControllerProps } from "react-hook-form";

import { ISignInForm, ISignUpForm } from "../components/ComponentsTypes";

export interface IButton {
	content: string | ReactNode;
	styleName: string;
	onClick?: () => void;
	type?: "button" | "submit";
}

export interface IInputProps extends UseControllerProps<ISignUpForm | ISignInForm> {
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
