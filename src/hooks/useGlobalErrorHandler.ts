"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function useGlobalErrorHandler() {
	useEffect(() => {
		const handleError = (event: Event) => {
			sendErrorToMonitoring((event as ErrorEvent)?.error ?? event.toString());
		};

		const handleUnhandledRejection = (event: Event) => {
			event.preventDefault();

			sendErrorToMonitoring((event as ErrorEvent)?.error ?? event.toString(), {
				filename: (event as ErrorEvent)?.filename,
			});
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);
}

export function sendErrorToMonitoring(error: unknown, context?: Sentry.Context) {
	if (process.env.NODE_ENV === "production") {
		Sentry.captureException(error as Error, context);
	}
}
