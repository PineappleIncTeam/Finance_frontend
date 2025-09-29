import { TGender } from "../api/PersonalAccount";

export interface IUserDataState {
	email: string;
	nickname: string;
	country: number;
	country_name: string;
	gender: TGender;
	avatar: string;
	defaultAvatar: number;
}

export interface IUserSettingsState {
	currency: string;
	theme: string;
	assistant: boolean;
}

export interface IUserState {
	balanceString: number;
	balanceCosts: number;
	balanceBase: string;
	userData: IUserDataState;
	settings: IUserSettingsState;
	loading: boolean;
	error: string | null;
}
