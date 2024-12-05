export interface ISignupUserData {
	email: string;
	username: string;
	password: string;
}

export interface IValidateTokenResponse {
	id: number;
	email: string;
}

export interface IUserValidationResponse {
	uid: string;
	token: string;
}