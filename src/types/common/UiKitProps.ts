import { ReactNode } from "react";

export interface IButton {
	content: string | ReactNode;
	styleName: string;
	onClick?: () => void;
}
