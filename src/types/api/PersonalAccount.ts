export type TGender = "M" | "F";

export interface IChangePasswordPayload {
	oldPassword: string;
	newPassword: string;
}

export interface IUserEmailDataResponse {
	id: number;
	email: string;
}

export interface IUserProfileDataResponse {
	nickname: string;
	gender: TGender;
	country: number;
	country_name: string;
	avatar: string;
	defaultAvatar: number;
}

export interface IFetchUserDataResponse {
	email: string;
	nickname: string;
	gender: TGender;
	country: number;
	country_name: string;
	avatar: string;
	defaultAvatar: number;
}

export type TChangeUserProfileDataRequest = Omit<IUserProfileDataResponse, "country_name">;

export interface IChangingUserProfilePasswordRequest {
	baseUrl: string;
	data: {
		current_password: string;
		new_password: string;
	};
}

export interface ICountryData {
	id: number;
	name: string;
	code: string;
}
