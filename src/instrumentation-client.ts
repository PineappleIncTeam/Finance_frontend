import * as Sentry from "@sentry/nextjs";

import { validateTokenEndpoint } from "./services/api/auth/apiConstants";

Sentry.init({
	dsn: "https://f03cfc88c0603e541df1f60fca1b4a60@o4510324817330176.ingest.de.sentry.io/4510324909408336",
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
