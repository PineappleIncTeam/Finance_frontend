import { RootState } from "../..";

const autoLoginSelector = (state: RootState) => {
	return state.autoLogin;
};

export default autoLoginSelector;
