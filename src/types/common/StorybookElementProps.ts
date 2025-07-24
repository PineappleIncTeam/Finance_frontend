import { JSX } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import {
	IAppInput,
	IAuthInput,
	ICustomCheckbox,
	ICustomInputDate,
	IRadioButton,
	ISelector,
	TAuthInputForm,
} from "./UiKitProps";

export type TAppInputStory = JSX.IntrinsicAttributes &
	IAppInput<FieldValues> & {
		defaultValue: string;
	};

export type TAuthInputStory = JSX.IntrinsicAttributes &
	IAuthInput &
	UseControllerProps<TAuthInputForm> & {
		defaultValue: string;
	};

export type TCheckboxStory<T extends FieldValues> = JSX.IntrinsicAttributes &
	ICustomCheckbox<T> & {
		defaultValue?: boolean;
		label?: string;
		disabled?: boolean;
	};

export type TInputDateStory<T extends FieldValues> = JSX.IntrinsicAttributes &
	ICustomInputDate<T> & {
		defaultValue?: Date | [Date | null, Date | null];
	};

export type TRadioButtonStory<T extends FieldValues> = JSX.IntrinsicAttributes &
	IRadioButton<T> & {
		disabled?: boolean;
	};

export type TSelectorStory<T extends TAuthInputForm> = JSX.IntrinsicAttributes &
	ISelector<T> & {
		defaultValue?: string;
		disabled?: boolean;
	};
