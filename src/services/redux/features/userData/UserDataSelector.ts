import { RootState } from "../../";

const userDataSelector = (state: RootState) => {
	return state.user;
};

export default userDataSelector;
