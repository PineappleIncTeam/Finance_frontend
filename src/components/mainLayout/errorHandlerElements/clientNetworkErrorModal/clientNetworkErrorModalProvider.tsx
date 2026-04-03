"use client";

import { useEffect, useState } from "react";

import { ClientNetworkErrorModalContext } from "../../../../hooks/useClientNetworkErrorModal";

import { IClientNetworkErrorModalProvider } from "../../../../types/components/ComponentsTypes";

export function ClientNetworkErrorModalProvider({ children }: IClientNetworkErrorModalProvider) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const offlineError: Error = {
		name: "Network Error",
		message: "Потеряно соединение с сервером. Пожалуйста, проверьте интернет-соединение.",
	};

	const openModal = (error: Error) => {
		setError(error);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setError(null);
	};

	useEffect(() => {
		const handleOffline = () => {
			openModal(offlineError);
		};

		const handleOnline = () => {
			closeModal();
		};

		window.addEventListener("offline", handleOffline);
		window.addEventListener("online", handleOnline);

		return () => {
			window.removeEventListener("offline", handleOffline);
			window.removeEventListener("online", handleOnline);
		};
	}, []);

	return (
		<ClientNetworkErrorModalContext.Provider value={{ isOpen, error, openModal, closeModal }}>
			{children}
		</ClientNetworkErrorModalContext.Provider>
	);
}
