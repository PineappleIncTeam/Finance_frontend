import { useCallback } from "react";

const useCurrentLinkCard = () => {
	return useCallback((id: string) => {
		if (id) {
			const urlString = window.location.href;
			const resultContent =
				urlString.substring(urlString.length - 2, urlString.length) === `/${id}` ? urlString : `${urlString}/${id}`;
			navigator.clipboard.writeText(resultContent);
		}
	}, []);
};

export default useCurrentLinkCard;
