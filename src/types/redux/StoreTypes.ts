import { ReactNode } from "react";

export interface IProviderList {
	children: ReactNode;
}

export type CookieStatusList = "pending" | "confirmed" | "rejected";

export interface ICookieStatus {
	status: CookieStatusList;
}
