export interface ISignupUserData {
	email: string;
	username: string;
	password: string;
}

export interface IValidateTokenResponse {
	id: number;
	email: string;
}
