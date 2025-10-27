import { useCallback, useEffect, useRef, useState } from "react";

import { TCommonFunction, TTimerRefState } from "../types/components/ComponentsTypes";

/**
 * @category Authentication Hooks
 *
 * @description
 * Хук для автоматического выхода пользователя после периода неактивности.
 * Создает таймер, который вызывает переданный callback через заданное время (по умолчанию 15 минут).
 * Предоставляет метод для сброса таймера при активности пользователя.
 *
 * @template TCommonFunction - Тип функции callback (без параметров и возвращаемого значения).
 * @param {TCommonFunction} callback - Функция, которая будет вызвана по истечении таймера.
 *                                    Например, функция выхода из системы (`logout`).
 *
 * @returns {Object} Объект с методом для сброса таймера.
 * @property {Function} resetTimer - Метод для перезапуска таймера. Должен вызываться
 *                                   при действиях пользователя (нажатия кнопок, движение мыши и т.д.).
 *
 * @example
 * // Использование в компоненте
 * const logout = () => {
 *   console.log('User logged out due to inactivity');
 *   // Реальная логика выхода
 * };
 *
 * const { resetTimer } = useLogoutTimer(logout);
 *
 * // Сброс таймера при активности
 * <button onClick={() => {
 *   resetTimer();
 *   // Другие действия...
 * }}>
 *   Click me
 * </button>
 *
 * @remarks
 * - Таймер автоматически запускается при монтировании компонента.
 * - Таймер очищается при размонтировании компонента.
 * - По умолчанию таймаут установлен на 15 минут (900000 мс).
 *
 * @warning
 * - Не используйте хук для критически важных операций без дополнительных подтверждений
 * - Для точного отслеживания активности рекомендуется комбинировать с обработчиками событий
 *   (mousemove, keydown и т.д.).
 */

export const useLogoutTimer = (callback: TCommonFunction) => {
	const [isOpenInactivityLogoutModal, setIsOpenInactivityLogoutModal] = useState<boolean>(false);
	const logoutTimerRef = useRef<TTimerRefState>(null);
	const modalTimerRef = useRef<TTimerRefState>(null);

	const minutes = 15;
	const seconds = 60;
	const mSeconds = 1000;

	const minutesCount = minutes * seconds * mSeconds;
	const timeBeforeLogout = minutesCount - 1 * seconds * mSeconds;

	const startLogoutTimer = useCallback(() => {
		logoutTimerRef.current = setTimeout(() => {
			callback();
			if (logoutTimerRef.current !== null) {
				clearInterval(+logoutTimerRef.current);
			}
		}, minutesCount);
	}, [callback, minutesCount]);

	const startModalTimer = useCallback(() => {
		modalTimerRef.current = setTimeout(() => {
			setIsOpenInactivityLogoutModal(true);
			if (modalTimerRef.current !== null) {
				clearInterval(+modalTimerRef.current);
			}
		}, timeBeforeLogout);
	}, [timeBeforeLogout]);

	useEffect(() => {
		startLogoutTimer();
		startModalTimer();

		return () => {
			if (logoutTimerRef.current !== null) {
				clearTimeout(+logoutTimerRef.current);
			}
		};
	}, [logoutTimerRef, startLogoutTimer, startModalTimer]);

	const resetTimer = () => {
		if (logoutTimerRef.current !== null) {
			clearTimeout(+logoutTimerRef.current);
		}
		if (modalTimerRef.current !== null) {
			clearTimeout(+modalTimerRef.current);
		}

		startLogoutTimer();
		startModalTimer();
	};

	return { resetTimer, setIsOpenInactivityLogoutModal, isOpenInactivityLogoutModal };
};
