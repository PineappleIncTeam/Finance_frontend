"use client";

import { createContext, useContext } from "react";

import { IAsyncErrorModalContext } from "../types/components/ComponentsTypes";

export const AsyncErrorModalContext = createContext<IAsyncErrorModalContext | undefined>(undefined);

export function useAsyncErrorModal() {
	const context = useContext(AsyncErrorModalContext);

	if (context === undefined) {
		throw new Error("useAsyncErrorModal must be used within an AsyncErrorModalProvider");
	}

	return context;
}
