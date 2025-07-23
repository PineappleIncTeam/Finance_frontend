import { JSX } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import { IAppInput, IAuthInput, ICustomCheckbox, TAuthInputForm } from "./UiKitProps";

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
