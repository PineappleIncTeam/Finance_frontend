import { RootState } from "../../";

const userDataSelector = (state: RootState) => {
	return state.data;
};

export default userDataSelector;
