import { ReactNode } from "react";

export interface IProviderList {
	children: ReactNode;
}

export type CookieStatusList = "pending" | "confirmed" | "rejected";

export interface IUserStorageSettings {
	cookieStatus: CookieStatusList;
	isAutoLogin: boolean;
}

export interface ICookieStatus {
	cookieStatus: CookieStatusList;
}

export interface IAutoLoginState {
	isAutoLogin: boolean;
}

export interface IUserData {
	name: string;
	email: string;
	nickname: string;
	country: string;
	gender: string;
	currency?: string;
	darkTheme?: "dark" | "light";
	finAssistant?: boolean;
	personalAvatar?: string;
}
