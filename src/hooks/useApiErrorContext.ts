"use client";

import { createContext, useContext } from "react";

import { IApiErrorContext } from "../types/components/ComponentsTypes";

export const ApiErrorModalContext = createContext<IApiErrorContext | null>(null);

export function useApiErrorContext() {
	const context = useContext(ApiErrorModalContext);

	if (!context) {
		throw new Error("useApiErrorModalContext must be used within apiErrorProvider");
	}

	return context;
}
