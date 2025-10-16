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

export interface IVkUserData {
	user_id: string;
	first_name: string;
	last_name: string;
	avatar: string;
	email: string;
	sex: number;
	verified: boolean;
	birthday: string;
	country?: string;
}

export interface IVKServiceDataResponse {
	user_info: {
		user: IVkUserData;
	};
}
