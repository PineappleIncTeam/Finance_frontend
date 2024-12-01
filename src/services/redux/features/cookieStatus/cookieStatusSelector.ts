import { RootState } from "../..";

const cookieStatusSelector = (state: RootState) => {
	return state.cookieStatus;
};

export default cookieStatusSelector;
