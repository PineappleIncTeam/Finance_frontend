import { useEffect, useRef, useState, useCallback } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number = 500) {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		},
		[delay],
	);
}
