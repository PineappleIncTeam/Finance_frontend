import cn from "classnames";

import { ISimpleTooltip } from "../../../types/common/ComponentsProps";

import style from "./simpleTooltip.module.scss";

export const SimpleTooltip = ({ open, text, className }: ISimpleTooltip) => {
	return (
		<dialog open={open} className={cn(style.simpleTooltip, className)}>
			{text}
		</dialog>
	);
};
