import { JSX } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import { IAppInput, IAuthInput, TAuthInputForm } from "./UiKitProps";

export type TAppInputStory = JSX.IntrinsicAttributes &
	IAppInput<FieldValues> & {
		defaultValue: string;
	};

export type TAuthInputStory = JSX.IntrinsicAttributes &
	IAuthInput &
	UseControllerProps<TAuthInputForm> & {
		defaultValue: string;
	};
