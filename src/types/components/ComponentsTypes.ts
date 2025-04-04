import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IUser {
	age: number;
	parentalConsent: boolean;
	country: string;
}

export interface ISignUpForm {
	email?: string;
	password?: string;
	re_password?: string;
	agreementField?: boolean;
}

export interface ICorrectSignInForm {
	email: string;
	password: string;
}

export interface ISignInForm {
	email?: string;
	password?: string;
	isAutoAuth?: boolean;
}

export interface IInviteModal {
	isOpen: boolean;
	onClose: () => void;
}

export interface IVideoElement {
	videoId: string;
	close?: () => void;
}

export interface IUserActivation {
	uid: string | string[];
	token: string | string[];
}

export type TMessageModal = "success" | "warning" | "notification";

export interface IExpenseTransaction {
	firstDate: string;
	secondDate: string;
	purpose: string;
	sum: string;
}

export interface IIncomeTransaction {
	date: string;
	purpose: string;
	sum: number;
}
export interface IBurgerMenu {
	children: ReactNode;
	showMenu: boolean;
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export interface ISavingsTransaction {
	firstDate: string;
	secondDate: string;
	purpose: string;
	sum: string;
}

export interface IAnalyticsTransactions {
	firstDate: string;
	secondDate: string;
	purpose: string;
	sum: string;
}

export interface ISavingsItem {
	category: string;
	target: string;
	sum: string;
	status: string;
}

export enum SavingsFieldValues {
	category = "category",
	target = "target",
}

export enum SortOrderStateValue {
	asc = "asc",
	desc = "desc",
}

export type TSavingsFieldState = SavingsFieldValues | null;

export type TIndexState = number | null;

export interface IEditActionProps {
	index: number;
	field: SavingsFieldValues;
	value: string;
}

export type TCommonFunction = () => void;

export type TTimerRefState = ReturnType<typeof setTimeout> | null | number;
