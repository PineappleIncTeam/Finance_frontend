"use client";

import { useCallback } from "react";

export const useScrollLock = (lock: boolean) => {
	const lockScroll = useCallback(() => {
		document.body.style.overflow = "hidden";
	}, []);

	const unlockScroll = useCallback(() => {
		document.body.style.overflow = "";
	}, []);

	return lock ? lockScroll : unlockScroll;
};

export default useScrollLock;
