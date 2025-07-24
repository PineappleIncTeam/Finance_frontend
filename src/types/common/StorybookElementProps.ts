import { JSX } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

import {
	IAppInput,
	IAuthInput,
	ICustomCheckbox,
	ICustomInputDate,
	IRadioButton,
	ISelector,
	ISwitcher,
	TAuthInputForm,
} from "./UiKitProps";

export type BaseElementStoryProps<T = unknown> = JSX.IntrinsicAttributes & {
	disabled?: boolean;
	defaultValue?: T;
};

export type TAppInputStory = Required<BaseElementStoryProps<string>> & IAppInput<FieldValues>;

export type TAuthInputStory = Required<BaseElementStoryProps<string>> & IAuthInput & UseControllerProps<TAuthInputForm>;

export type TInputDateStory<T extends FieldValues> = BaseElementStoryProps<Date | [Date | null, Date | null]> &
	ICustomInputDate<T>;

export type TRadioButtonStory<T extends FieldValues> = BaseElementStoryProps & IRadioButton<T>;

export type TSelectorStory<T extends TAuthInputForm> = BaseElementStoryProps<string> & ISelector<T>;

export type TSwitcherStory<T extends TAuthInputForm> = BaseElementStoryProps<boolean> & ISwitcher<T>;

export type TCheckboxStory<T extends FieldValues> = BaseElementStoryProps<boolean> &
	ICustomCheckbox<T> & {
		label?: string;
	};
