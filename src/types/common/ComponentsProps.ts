import { StaticImageData } from "next/image";

import { MouseEvent } from "react";

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

export interface ITooltip {
	open: boolean;
	toggle?: () => void;
	text?: string;
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

export interface IFooter {
	isMainPage?: boolean;
}

export interface IExpensesTransaction {
	firstDateFormat: string;
	secondDateFormat?: string;
	purpose: string;
	sum: string;
}

export interface IArchiveItem {
	archiveItemValue: string;
	onMouseEnter: undefined | ((event: MouseEvent<HTMLDivElement>) => void);
	onMouseLeave: undefined | (() => void);
}

export interface ISimpleTooltip {
	open: boolean;
	toggle?: () => void;
	text?: string;
	className?: string;
	top?: number;
	left?: number;
}

export interface IRenderProfileItem {
	title: string;
	handleClick: (title: string) => void;
}

export interface IRenderNavItem {
	title: string;
	link?: string;
}

export interface ISidebarMenu {
	handleClick: (title: string) => void;
}

export interface IHandleMouseEnterArchiveItem {
	(event: MouseEvent<HTMLDivElement>, content: string): void;
}