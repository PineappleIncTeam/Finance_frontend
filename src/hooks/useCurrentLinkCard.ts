import { useCallback } from "react";

/**
 * @category Blog Hooks
 *
 * Хук для генерации и копирования ссылки на карточку блога с учетом текущего URL.
 * Автоматически определяет, нужно ли преобразовывать URL (замена `blog` на `blogPage`)
 * и копирует итоговую ссылку в буфер обмена.
 *
 * @param {string} id - Уникальный идентификатор карточки блога.
 * @returns {Function} Функция `(id: string) => void`, которую можно вызвать для копирования ссылки.
 *
 * @example
 * // Использование в компоненте карточки блога
 * const copyLink = useCurrentLinkCard();
 *
 * <button onClick={() => copyLink("123")}>
 *   Скопировать ссылку
 * </button>
 *
 * @remarks
 * 1. Проверяет, заканчивается ли текущий URL на `/${id}` (например, для детальных страниц).
 * 2. Если нет — заменяет `blog` на `blogPage` в текущем URL перед добавлением ID.
 * 3. Использует `navigator.clipboard` для копирования (требует HTTPS или localhost).
 *
 * @throws {SecurityError} Если вызван в небезопасном контексте (без HTTPS).
 * @throws {DOMException} Если пользователь запретил доступ к буферу обмена.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API | Clipboard API}
 */

export const useCurrentLinkCard = () => {
	return useCallback((id: string) => {
		if (id) {
			const urlString = window.location.href;
			const commonBlogPageLink = urlString.replace("blog", "blogPage");
			const resultContent =
				urlString.substring(urlString.length - 2, urlString.length) === `/${id}`
					? urlString
					: `${commonBlogPageLink}/${id}`;
			navigator.clipboard.writeText(resultContent);
		}
	}, []);
};
