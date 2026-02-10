import * as Sentry from "@sentry/nextjs";

import { validateTokenEndpoint } from "./services/api/auth/apiConstants";

Sentry.init({
	dsn: "https://fb9a35fc1827441692fa96deb165f293bbe1c6ba94c4441dbd1fb546503464d7@k1.hawk.so/0",
	enableLogs: true,
	sendDefaultPii: true,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	beforeSend(event, _hint) {
		if (event.exception && event.exception.values) {
			for (const exception of event.exception.values) {
				if (exception.value && exception.value.includes("4")) {
					if (event.request && event.request.url && event.request.url.includes(validateTokenEndpoint.slice(0, -1))) {
						return null;
					}
				}
			}
		}

		return event;
	},
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
