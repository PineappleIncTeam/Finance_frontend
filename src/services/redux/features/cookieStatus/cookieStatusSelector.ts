import { RootState } from "../..";

const cookieStatusSelector = (state: RootState) => {
	return state.status;
};

export default cookieStatusSelector;
