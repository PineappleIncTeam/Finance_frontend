import { useEffect, useRef } from "react";

/**
 * @category UI Hooks
 * 
 * Хук для блокировки прокрутки страницы с сохранением позиции скролла.
 * Полезен для модальных окон, сайдбаров и других случаев, когда нужно временно запретить скролл страницы.
 *
 * @param {boolean} toggle - Флаг, определяющий, нужно ли заблокировать скролл.
 *   - `true`: скролл блокируется, текущая позиция сохраняется.
 *   - `false`: скролл восстанавливается, страница возвращается к сохранённой позиции.
 *
 * @example
 * // Блокировка скролла при открытии модального окна
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * useLockScroll(isModalOpen);
 *
 * // В компоненте:
 * <button onClick={() => setIsModalOpen(true)}>Открыть модалку</button>
 * {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
 *
 * @remarks
 * Хук учитывает наличие скроллбара на странице до блокировки:
 * - Если скроллбар был, он заменяется фиксированным позиционированием body.
 * - Если скроллбара не было, блокировка происходит без добавления скроллбара.
 *
 * @warning
 * Избегайте вложенного использования (например, несколько модалок с блокировкой скролла),
 * так как хук не поддерживает стек состояний.
 */

export const useLockScroll = (toggle: boolean) => {
	const position = useRef(window.scrollY);
	const hadScrollBar = window.innerWidth > document.documentElement.clientWidth;

	useEffect(() => {
		if (toggle) position.current = window.scrollY;
		document.body.style.top = toggle ? `-${position.current}px` : "";
		document.body.style.height = toggle ? "100vh" : "";
		document.body.style.position = toggle ? "fixed" : "";
		document.body.style.width = toggle ? "100%" : "";
		document.body.style.overflowY = toggle ? `${hadScrollBar ? "scroll" : "default"}` : "";
		window.scrollTo(0, position.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggle]);
};
