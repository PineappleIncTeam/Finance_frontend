import { JSX } from "react";
import { FieldValues } from "react-hook-form";

import { IAppInput } from "./UiKitProps";

export type TAppInputStory = JSX.IntrinsicAttributes &
	IAppInput<FieldValues> & {
		defaultValue: string;
	};
