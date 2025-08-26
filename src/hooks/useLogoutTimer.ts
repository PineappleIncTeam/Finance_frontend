import { useCallback, useEffect, useRef } from "react";

import { TCommonFunction, TTimerRefState } from "../types/components/ComponentsTypes";

/**
 * @category Auth Hooks
 *
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
	const timerRef = useRef<TTimerRefState>(null);

	const minutes = 15;
	const seconds = 60;
	const mSeconds = 1000;

	const minutesCount = minutes * seconds * mSeconds;

	const startTimer = useCallback(() => {
		timerRef.current = setTimeout(() => {
			callback();
			if (timerRef.current !== null) {
				clearInterval(+timerRef.current);
			}
		}, minutesCount);
	}, [callback, minutesCount]);

	useEffect(() => {
		startTimer();

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(+timerRef.current);
			}
		};
	}, [timerRef, startTimer]);

	const resetTimer = () => {
		if (timerRef.current !== null) {
			clearTimeout(+timerRef.current);
		}
		startTimer();
	};

	return { resetTimer };
};
