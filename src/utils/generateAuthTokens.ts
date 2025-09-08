import pkceChallenge from "pkce-challenge";

const stateCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
const stateCharsetLength = 64;
const stateLength = 32;

/**
 * @category Authentication Utilities
 * @subcategory OAuth Security Utilities
 *
 * @description
 * Внутренняя вспомогательная функция для генерации PKCE challenge пары.
 * Не предназначена для прямого использования, используйте {@link generateCodeChallenge} и {@link generateCodeVerifier}.
 *
 * @private
 * @returns {Promise<{ code_challenge: string; code_verifier: string }>} Объект с code_challenge и code_verifier
 * @throws {Error} Если генерация PKCE challenge завершилась неудачно
 */

export const generatePkceChallenge = async () => {
	return await pkceChallenge();
};

/**
 * @category Authentication Utilities
 * @subcategory Public OAuth Utilities
 *
 * @description
 * Генерирует случайный state параметр для OAuth 2.0 авторизации.
 * State защищает от CSRF атак и позволяет связать запрос с ответом.
 *
 * @returns {string} Случайная строка длиной 32 символа из безопасного набора символов
 *
 * @example
 * // Использование в OAuth flow:
 * const state = generateState();
 * // Сохранение для проверки при callback
 * sessionStorage.setItem('oauth_state', state);
 *
 * // При callback:
 * const returnedState = urlParams.get('state');
 * const savedState = sessionStorage.getItem('oauth_state');
 * if (returnedState !== savedState) {
 *   throw new Error('State mismatch - possible CSRF attack');
 * }
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc6749#section-10.12 | RFC 6749 - OAuth 2.0 Security Considerations}
 *
 * @securityNote State должен быть уникальным для каждой авторизационной сессии
 * и проверяться при получении callback для предотвращения CSRF атак.
 */

export const generateState = () => {
	let result = "";

	for (let i = 0; i < stateLength; i++) {
		const randomIndex = Math.floor(Math.random() * stateCharsetLength);
		result += stateCharset[randomIndex];
	}

	return result;
};
