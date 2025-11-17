import { ICountryData, TGender } from "../api/PersonalAccount";

export interface IUserDataState {
	email: string;
	nickname: string;
	country: number;
	country_name: string;
	gender: TGender;
	avatar: string;
	defaultAvatar: number;
}

export interface IUserState {
	balanceString: number;
	balanceCosts: number;
	balanceBase: string;
	userData: IUserDataState;
	loading: boolean;
	error: string | null;
}

export interface IUserSettingsState {
	currency: string;
	theme: string;
	assistant: boolean;
}

export type TSettingUserSettings = Partial<IUserSettingsState>;

export interface ICountriesDataState {
	countries: ICountryData[];
	loading: boolean;
	error: string | null;
}

export interface IBalanceState {
	currentBalance: number;
	loading: boolean;
	error: string | null;
}
