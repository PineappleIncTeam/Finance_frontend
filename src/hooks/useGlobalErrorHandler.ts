"use client";

import { useEffect } from "react";

export function useGlobalErrorHandler() {
	useEffect(() => {
		const handleError = (event) => {
			sendErrorToMonitoring(event.error);
		};

		const handleUnhandledRejection = (event) => {
			event.preventDefault();

			sendErrorToMonitoring(event.reason);
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);
}

function sendErrorToMonitoring(error) {
	if (process.env.NODE_ENV === "production") {
		// console.log("Sending error to monitoring service:", error);
	}
}
