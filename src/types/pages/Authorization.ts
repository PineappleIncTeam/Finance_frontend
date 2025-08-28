export interface ISignupFormValues {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export interface IVKLoginSuccessPayload {
	code: string;
	device_id: string;
}

export interface IVkAuthRequest {
	code: string;
	code_verifier: string;
	device_id: string;
}

export interface IPkceCodeSet {
	code_verifier: string;
	code_challenge: string;
}
