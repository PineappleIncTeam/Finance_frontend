"use client";

import { useState } from "react";

import { ClientNetworkErrorModalContext } from "../../../../hooks/useClientNetworkErrorModal";

import { IClientNetworkErrorModalProvider } from "../../../../types/components/ComponentsTypes";

export function ClientNetworkErrorModalProvider({ children }: IClientNetworkErrorModalProvider) {
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
		<ClientNetworkErrorModalContext.Provider value={{ isOpen, error, openModal, closeModal }}>
			{children}
		</ClientNetworkErrorModalContext.Provider>
	);
}
