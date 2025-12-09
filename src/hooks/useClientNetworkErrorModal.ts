"use client";

import { createContext, useContext } from "react";

import { IClientNetworkErrorModalContext } from "../types/components/ComponentsTypes";

export const ClientNetworkErrorModalContext = createContext<IClientNetworkErrorModalContext | undefined>(undefined);

export function useClientNetworkErrorModal() {
	const context = useContext(ClientNetworkErrorModalContext);

	if (context === undefined) {
		throw new Error("useClientNetworkErrorModal must be used within an ClientNetworkErrorModalContext");
	}

	return context;
}
