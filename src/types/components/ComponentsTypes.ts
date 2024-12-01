export interface IUser {
	age: number;
	parentalConsent: boolean;
	country: string;
}

export interface ISignUpForm {
	email: string;
	password?: string;
	re_password?: string;
}

export interface ISignInForm {
	email: string;
	password?: string;
}

export interface IInviteModal {
	isOpen: boolean;
	onClose: () => void;
}

export interface IVideoElement {
	videoId: string;
	close?: () => void;
}

export interface IExpenseTransaction {
	date1: string;
	date2?: string;
	purpose: string;
	sum: string;
}
