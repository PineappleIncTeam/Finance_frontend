"use client";

import { TAsyncFunctionErrorHandling } from "../types/components/ComponentsTypes";

import { useAsyncErrorModal } from "./useAsyncErrorModal";

export function useHandleAsyncError() {
	const { openModal } = useAsyncErrorModal();

	const isDev = process.env.NODE_ENV === "development";

	const handleAsyncError = (error: Error, context?: Record<string, unknown>) => {
		if (isDev) {
			openModal(error);
		} else {
			// monitoringService.logError(error, context);
		}
	};

	const withErrorHandling = <T extends any[], R>(asyncFunction: TAsyncFunctionErrorHandling<T, R>) => {
		return async (...args: T): Promise<R> => {
			try {
				return await asyncFunction(...args);
			} catch (error) {
				if (error instanceof Error) {
					handleAsyncError(error, { functionName: asyncFunction.name });
				} else {
					handleAsyncError(new Error(String(error)), { functionName: asyncFunction.name });
				}

				throw error;
			}
		};
	};

	return {
		handleAsyncError,
		withErrorHandling,
	};
}
