import { RootState } from "../../";

const infoPartSelector = (state: RootState) => {
	return state.data;
};

export default infoPartSelector;
