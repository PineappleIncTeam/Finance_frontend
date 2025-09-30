import { useRouter } from "next/navigation";
import axios from "axios";

import { AuthTypes } from "../types/pages/Authorization";
import { baseLogoutUser } from "../services/api/auth/baseLogoutUser";
import { MainPath } from "../services/router/routes";
import { mockLocalhostStr, mockLocalhostUrl } from "../services/api/auth/apiConstants";

/**
 * @category Authentication Hooks
 *
 * @description
 * Обрабатывает процесс выхода пользователя из системы.
 * Выполняет logout запрос на сервер и обрабатывает возможные ошибки с перенаправлением на соответствующие страницы.
 *
 * @param {string | undefined} url - URL endpoint для выхода пользователя. Если undefined, запрос не выполняется.
 * @returns {{ request: () => Promise<void> }} Объект с асинхронной функцией `request` для запуска процесса выхода.
 *
 * @example
 * // Использование в React-компоненте:
 * const { request } = useHandleLogout('/api/auth/logout');
 *
 * <button onClick={request}>
 *   Выйти
 * </button>
 *
 * @example
 * // Использование с кастомным URL:
 * const logoutUrl = user.isAdmin ? '/api/admin/logout' : '/api/auth/logout';
 * const { request } = useHandleLogout(logoutUrl);
 *
 * @remarks
 * 1. Выполняет POST-запрос на указанный URL через `baseLogoutUser`.
 * 2. При успешном выходе (200 OK) перенаправляет на главную страницу.
 * 3. Обрабатывает ошибки HTTP:
 *    - 4xx ошибки (клиентские) → перенаправление на главную
 *    - 5xx ошибки (серверные) → перенаправление на страницу ошибки сервера
 *
 * @errorHandling
 * - 400-499: Считается успешным выходом (возможно, сессия уже истекла)
 * - 500-511: Серверная ошибка, перенаправление на страницу ошибки
 * - Network errors: Не обрабатываются явно (можно добавить при необходимости)
 *
 * @see {@link logoutUser} Функция выполнения logout запроса
 * @see {@link MainPath} Enum с путями для перенаправления
 *
 * @throws {TypeError} Если передан неверный тип параметра
 */

export function useHandleLogout(url: string | undefined) {
	const router = useRouter();

	/**
	 * Асинхронная функция для выполнения запроса выхода
	 * @returns {Promise<void>}
	 */
	const request = async () => {
		try {
			if (url) {
				const authType: AuthTypes = await ((localStorage.getItem("authType") as AuthTypes) || AuthTypes.baseAuth);
				const isLocalhost =
					window.location.hostname.includes(mockLocalhostStr) || window.location.hostname.includes(mockLocalhostUrl);

				if (!isLocalhost) {
					if (authType === AuthTypes.baseAuth) {
						const response = await baseLogoutUser(url);
						if (response.status === axios.HttpStatusCode.Ok) {
							await localStorage.removeItem("authType");

							router.push(MainPath.Main);
						}
					} else {
						// vk auth logout
					}
				}
			}
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.BadRequest &&
				error.response.status < axios.HttpStatusCode.InternalServerError
			) {
				router.push(MainPath.Main);
			}
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status &&
				error.response.status >= axios.HttpStatusCode.InternalServerError &&
				error.response.status <= axios.HttpStatusCode.NetworkAuthenticationRequired
			) {
				return router.push(MainPath.ServerError);
			}
		}
	};
	return { request };
}
