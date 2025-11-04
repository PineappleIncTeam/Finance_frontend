"use client";

import { useState, useCallback } from "react";

import { IApiErrorState, TApiErrorType } from "../types/components/ComponentsTypes";

export function useApiErrorModal() {
	const [modalState, setModalState] = useState<IApiErrorState>({
		isOpen: false,
		title: "",
		message: "",
		errorType: null,
	});

	const showError = useCallback((errorType: TApiErrorType, customMessage?: string) => {
		const errorConfig = {
			"403": {
				title: "Нет доступа",
				message: customMessage || "У вас нет доступа для запроса ресурса.",
			},
			"408": {
				title: "Тайм-аут запроса",
				message: customMessage || "Истекло время ожидания.",
			},
			"429": {
				title: "Слишком много запросов",
				message: customMessage || "У вас слишком много запросов. Пожалуйста, повторите позже.",
			},
			"500": {
				title: "Ошибка сервиса",
				message: customMessage || "Внутренняя ошибка сервиса.",
			},
			"502": {
				title: "Неправильный шлюз",
				message: customMessage || "Что-то пошло не так на нашем сервисе. Пожалуйста, повторите позже.",
			},

			"503": {
				title: "Сервис недоступен",
				message: customMessage || "Сервис временно недоступен.",
			},
			"504": {
				title: "Тайм-аут шлюза",
				message: customMessage || "Сервис не отвечает. Пожалуйста, повторите позже.",
			},
		};

		setModalState({
			isOpen: true,
			errorType,
			...errorConfig[errorType],
		});
	}, []);

	const hideError = useCallback(() => {
		setModalState((prev) => ({
			...prev,
			isOpen: false,
		}));
	}, []);

	const reset = useCallback(() => {
		setModalState({
			isOpen: false,
			title: "",
			message: "",
			errorType: null,
		});
	}, []);

	return {
		modalState,
		showError,
		hideError,
		reset,
	};
}
