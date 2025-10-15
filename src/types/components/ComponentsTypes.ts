import { Dispatch, ReactNode, SetStateAction } from "react";

import { TGender } from "../api/PersonalAccount";
import { IUserAvatar } from "../pages/userProfileSettings";

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
	date: string;
	amount: string;
	name?: string;
	target: string;
	type: string;
	categories: number;
	id: number;
	onDeleteClick: () => void;
	editClick: () => void;
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
	name = "name",
	amount = "amount",
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
	value: string | number;
}

export type TCommonFunction = () => void;

export type TTimerRefState = ReturnType<typeof setTimeout> | null | number;

export interface IAddCategoryExpensesForm {
	name: string;
	is_income: boolean;
	is_outcome: boolean;
}

export interface IRemoveCategory {
	categoryName: string;
	categoryId: number;
}

export interface IEditTransactionForm {
	date: string;
	amount: number;
}

export interface ICurrencyItem {
	currency: string;
	rate: number;
}

export interface ICurrencyRates {
	dollar: number;
	euro: number;
	crypto: number;
}

export interface ISavingsTransaction {
	date: string;
	amount: string;
	name?: string;
	type: string;
	categories: number;
	id: number;
	onDeleteClick: () => void;
	editClick: () => void;
}
export type IPrivateDataForm = {
	nickname: string;
	gender: TGender;
	countryName: string;
	email?: string;
};

export type IPrivateAppSettingsForm = {
	currency: string;
	darkTheme: boolean;
	finAssistant: boolean;
};

export type IProfileAvatarForm = IUserAvatar;

export type IInactivityLogoutModal = {
	open: boolean;
	onStayClick: () => void;
	onLogoutClick: () => void;
};
