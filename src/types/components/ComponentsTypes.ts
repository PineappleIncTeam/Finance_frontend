export interface IUser {
	age: number;
	parentalConsent: boolean;
	country: string;
}

export interface ISignUpForm {
	email: string;
	password?: string;
	re_password?: string;
	agreementField?: boolean;
}

export interface ISignInForm {
	email: string;
	password?: string;
	isAuth?: boolean;
}

export interface IInviteModal {
	isOpen: boolean;
	onClose: () => void;
}

export interface IVideoElement {
	videoId: string;
	close?: () => void;
}
