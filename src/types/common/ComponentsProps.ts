import { StaticImageData } from "next/image";

export type CustomLayout = () => Element;

export interface INewPasswordModal {
	email: string;
	open: boolean;
	toggle: () => void;
}

export interface IChangePasswordModal {
	open: boolean;
}

export interface IBlogCard {
	image: string | StaticImageData;
	date: string;
	descriptionImage: string;
	text: string;
	blogAction: () => void;
	id?: string;
}
