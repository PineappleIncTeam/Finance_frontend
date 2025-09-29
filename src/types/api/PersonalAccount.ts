import { IChangePasswordForm } from "../pages/userProfileSettings";

export type TGender = "male" | "female";

export interface IChangePasswordPayload {
	oldPassword: string;
	newPassword: string;
}

export interface IGettingUserDataRequest {
	baseURL: string;
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
	data: Omit<IChangePasswordForm, "repeatPassword">;
	baseUrl: string;
}
