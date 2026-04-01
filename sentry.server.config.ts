import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://fb9a35fc1827441692fa96deb165f293bbe1c6ba94c4441dbd1fb546503464d7@k1.hawk.so/0",
    enableLogs: true,
    sendDefaultPii: true,
  });
}
