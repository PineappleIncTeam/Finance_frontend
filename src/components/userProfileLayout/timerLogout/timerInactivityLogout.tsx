import { useEffect, useRef, useState } from "react";

import InactivityLogoutModal from "../inactivityLogoutModal/inactivityLogoutModal";
import { ITimerInactivityLogout } from "../../../types/components/ComponentsTypes";

export const TimerInactivityLogoutModal = ({
	resetTimer,
	requestLogout,
	durationInMinutes,
}: ITimerInactivityLogout) => {
	const [isInactivityLogoutModalOpen, setIsActivityModalOpen] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const secondsInMinute: number = 60;
	const mSeconds: number = 1000;
	const durationInMs: number = durationInMinutes * secondsInMinute * mSeconds;

	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsActivityModalOpen(true);
		}, durationInMs);

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [setIsActivityModalOpen, durationInMs]);

	const stay = () => {
		clearTimeout(timerRef.current);
		setIsActivityModalOpen(false);
		resetTimer();
	};

	const logout = () => {
		requestLogout();
		setIsActivityModalOpen(false);
	};

	return (
		<InactivityLogoutModal
			open={isInactivityLogoutModalOpen}
			onStayClick={() => stay()}
			onLogoutClick={() => logout()}
		/>
	);
};
