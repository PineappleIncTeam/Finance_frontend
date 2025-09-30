import { RootState } from "../../index";

export const countriesDataSelector = (state: RootState) => state.countriesData.countries;
