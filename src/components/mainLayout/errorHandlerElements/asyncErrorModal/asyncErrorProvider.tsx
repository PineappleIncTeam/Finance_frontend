"use client";

import { useState } from "react";

import { AsyncErrorModalContext } from "../../../../hooks/useAsyncErrorModal";

import { IAsyncErrorModalProvider } from "../../../../types/components/ComponentsTypes";

export function AsyncErrorModalProvider({ children }: IAsyncErrorModalProvider) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const openModal = (error: Error) => {
		setError(error);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setError(null);
	};

	return (
		<AsyncErrorModalContext.Provider value={{ isOpen, error, openModal, closeModal }}>
			{children}
		</AsyncErrorModalContext.Provider>
	);
}
