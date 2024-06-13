import { ReactNode } from "react";

import { UseControllerProps } from "react-hook-form";

import { ISignUpForm } from "../components/ComponentsTypes";

export interface IButton {
	content: string | ReactNode;
	styleName: string;
	onClick?: () => void;
	type?: "button" | "submit";
}

export interface IInputProps extends UseControllerProps<ISignUpForm> {
	label: string;
	type: string;
	placeholder?: string;
	autoComplete?: string;
	subtitle?: string;
	error?: string;
}

export interface ITitle {
	title: string;
}
