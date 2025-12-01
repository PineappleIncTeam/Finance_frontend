import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://f03cfc88c0603e541df1f60fca1b4a60@o4510324817330176.ingest.de.sentry.io/4510324909408336",
	enableLogs: true,
	sendDefaultPii: true,
});
