export const stateTypes = 0;

export interface IUserState {
	token: string | null;
	balanceString: number;
	balanceCosts: number;
	balanceBase: string;
	userData: {
		name: string;
		email: string;
		nickname: string;
		country: string;
		gender: string;
		avatar?: string;
		loading: boolean;
		error: string | null;
	};
	settings: {
		currency: string;
		theme: string;
		assistant: boolean;
	};
}
