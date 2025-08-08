import { TargetStatusType } from "../../helpers/targetStatus";

export interface ITarget {
	id: number;
	name: string;
	user_id: string;
	amount: number;
	current_sum: number;
	status: TargetStatusType;
}
