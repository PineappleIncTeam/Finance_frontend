import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cookieStatus", "autoLogin", "userSettings"],
};

export default persistConfig;
