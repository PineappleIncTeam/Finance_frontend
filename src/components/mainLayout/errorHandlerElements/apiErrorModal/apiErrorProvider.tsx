"use client";

import { useApiErrorModal } from "../../../../hooks/useApiErrorModal";
import { ApiErrorModalContext } from "../../../../hooks/useApiErrorContext";

import { IApiErrorProvider } from "../../../../types/components/ComponentsTypes";

import ApiErrorModal from "./apiErrorModal";

export function ApiErrorProvider({ children }: IApiErrorProvider) {
	const { modalState, showError, hideError } = useApiErrorModal();

	return (
		<ApiErrorModalContext.Provider value={{ showError, hideError, modalState }}>
			{children}
			<ApiErrorModal modalState={modalState} onClose={hideError} />
		</ApiErrorModalContext.Provider>
	);
}
