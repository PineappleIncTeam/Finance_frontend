import { useCallback, useEffect, useRef } from "react";

import { TCommonFunction } from "../types/common/ComponentsProps";

const useLogoutTimer = (callback: TCommonFunction) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null | number>(null);

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
		clearTimeout(timerRef.current);
		startTimer();
	};

	return { resetTimer };
};

export default useLogoutTimer;
