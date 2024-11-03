import { ITeamMember } from "../types/common/ComponentsProps";

import productOwner from "./teamImages/Product-owner.webp";
import productManager from "./teamImages/Product-manager.webp";
import analitic from "./teamImages/Analitic.webp";

export const AboutUsTeam: ITeamMember[] = [
	{
		teamRole: "Product owner",
		photo: productOwner,
	},
	{
		teamRole: "Product manager",
		photo: productManager,
	},
	{
		teamRole: "Analitic",
		photo: analitic,
	},
];
