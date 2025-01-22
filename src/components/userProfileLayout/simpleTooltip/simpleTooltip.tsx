import cn from "classnames";

import { ISimpleTooltip } from "../../../types/common/ComponentsProps";

import style from "./simpleTooltip.module.scss";

export const SimpleTooltip = ({ open, text, top, left, className }: ISimpleTooltip) => {
	return (
		<dialog open={open} className={cn(style.simpleTooltip, className)} style={{ top, left }}>
			{text}
		</dialog>
	);
};
