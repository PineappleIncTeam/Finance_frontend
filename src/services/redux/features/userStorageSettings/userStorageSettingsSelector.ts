import { RootState } from "../../";

const userStorageSettingsSelector = (state: RootState) => {
	return state.status;
};

export default userStorageSettingsSelector;
