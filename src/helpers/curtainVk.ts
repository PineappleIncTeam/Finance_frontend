import * as VKID from "@vkid/sdk";

import { ICurtainVk } from "../types/common/ComponentsProps";

export const curtainVK = (handleError: ICurtainVk) => {
	const floatingOneTap = new VKID.FloatingOneTap();
	floatingOneTap
		.render({ appName: "freenance-app", scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS })
		.on(VKID.WidgetEvents.ERROR, handleError);

	VKID.Auth.login();
};
