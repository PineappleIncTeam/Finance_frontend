import { useCallback } from "react";

const useCurrentLinkCard = () => {
	return useCallback((id: string) => {
		if (id) {
			navigator.clipboard.writeText(window.location.href + "/" + id);
		}
	}, []);
};

export default useCurrentLinkCard;
