"use client";

import { TAsyncFunctionErrorHandling } from "../types/components/ComponentsTypes";

import { useAsyncErrorModal } from "./useAsyncErrorModal";

export function useHandleAsyncError() {
	const { openModal } = useAsyncErrorModal();

	const isDev = String(process.env.NODE_ENV) !== "production";

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleAsyncError = (error: Error, _context?: Record<string, unknown>) => {
		if (isDev) {
			openModal(error);
		} else {
			// sendErrorToMonitoring(error, asyncErrorContext);
		}
	};

	const withErrorHandling = <T extends unknown[], R>(asyncFunction: TAsyncFunctionErrorHandling<T, R>) => {
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
