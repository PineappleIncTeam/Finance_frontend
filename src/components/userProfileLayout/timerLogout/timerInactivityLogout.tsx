import { useCallback, useEffect, useRef, useState } from "react";

import InactivityLogoutModal from "../inactivityLogoutModal/inactivityLogoutModal";
import { ITimerInactivityLogout } from "../../../types/components/ComponentsTypes";

export const TimerInactivityLogoutModal = ({
	resetTimer,
	requestLogout,
	durationInMinutes,
}: ITimerInactivityLogout) => {
	const [isInactivityLogoutModalOpen, setIsActivityModalOpen] = useState<boolean>(false);
	const sessionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const modalCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const secondsInMinute: number = 60;
	const mSeconds: number = 1000;
	const durationInMs: number = durationInMinutes * secondsInMinute * mSeconds;
	const modalDisplayInMs: number = 1 * secondsInMinute * mSeconds;

	const startSessionTimer = useCallback(() => {
		sessionTimerRef.current = setTimeout(() => {
			setIsActivityModalOpen(true);
		}, durationInMs);
	}, [durationInMs]);

	const resetTimerAndSession = () => {
		if (sessionTimerRef.current) {
			clearTimeout(+sessionTimerRef.current);
		}
		if (modalCloseTimerRef.current) {
			clearTimeout(+modalCloseTimerRef);
		}
		setIsActivityModalOpen(false);
		startSessionTimer();
	};

	useEffect(() => {
		startSessionTimer();

		return () => {
			if (sessionTimerRef.current !== null) {
				clearTimeout(+sessionTimerRef.current);
			}
			if (modalCloseTimerRef.current !== null) {
				clearTimeout(+modalCloseTimerRef);
			}
		};
	}, [startSessionTimer, sessionTimerRef, modalCloseTimerRef]);

	useEffect(() => {
		if (isInactivityLogoutModalOpen) {
			modalCloseTimerRef.current = setTimeout(() => {
				setIsActivityModalOpen(false);
			}, modalDisplayInMs);
		}

		return () => {
			if (modalCloseTimerRef.current) {
				clearTimeout(modalCloseTimerRef.current);
			}
		};
	}, [isInactivityLogoutModalOpen, modalDisplayInMs]);

	const stay = () => {
		resetTimerAndSession();
		resetTimer();
	};

	const logout = () => {
		resetTimer();
		requestLogout();
		resetTimerAndSession();
	};

	return (
		<InactivityLogoutModal
			open={isInactivityLogoutModalOpen}
			onStayClick={() => stay()}
			onLogoutClick={() => logout()}
		/>
	);
};
