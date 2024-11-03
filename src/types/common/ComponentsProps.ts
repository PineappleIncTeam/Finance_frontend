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

export interface IUserProfileSidebar {
	avatar?: string;
	balance?: string;
	name?: string;
}

export interface ICurrentRate {
	dollar?: string;
	euro?: string;
	crypto?: string;
}

export interface INavBar {
	onClick?: () => void;
}

export interface IBlogArticle {
	image?: string;
	date: string;
	title: string;
	articleContent: string[];
	articleAction?: () => void;
	id: string;
}

export interface IBlogArticleShareTooltip {
	open: boolean;
	toggle?: () => void;
}

export type TCommonFunction = () => void;

export interface IAboutUsCard {
	photo: string | StaticImageData;
	teamRole: string;
}

export interface ITeamMember {
	teamRole: string;
	photo: StaticImageData;
}
