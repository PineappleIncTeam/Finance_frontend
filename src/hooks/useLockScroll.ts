import { useEffect, useRef } from "react";

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
