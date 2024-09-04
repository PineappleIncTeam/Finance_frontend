export interface IUser {
	age: number;
	parentalConsent: boolean;
	country: string;
}

export interface ISignUpForm {
	email: string;
	password: string;
	re_password: string;
}
