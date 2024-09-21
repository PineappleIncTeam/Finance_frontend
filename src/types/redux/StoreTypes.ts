import { ReactNode } from "react";

export interface IProviderList {
	children: ReactNode;
}

export interface ICookieStatus {
	status: "pending" | "confirmed" | "rejected";
}
