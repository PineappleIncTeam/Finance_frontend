import { ReactNode } from "react";

export type CustomLayout = () => Element;

export interface IButton {
	content: string | ReactNode;
	styleName: string;
	onClick?: () => void;
}