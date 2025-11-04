"use client";

import { useEffect } from "react";

export function useGlobalErrorHandler() {
	useEffect(() => {
		const handleError = (event: Event) => {
			sendErrorToMonitoring((event as ErrorEvent)?.error ?? event.toString());
		};

		const handleUnhandledRejection = (event: Event) => {
			event.preventDefault();

			sendErrorToMonitoring((event as ErrorEvent)?.error ?? event.toString(), (event as ErrorEvent)?.filename ?? null);
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);
}

function sendErrorToMonitoring(error: any, context?: any) {
	if (process.env.NODE_ENV === "production") {
		// monitoringService.logError(error, context);
	}
}
