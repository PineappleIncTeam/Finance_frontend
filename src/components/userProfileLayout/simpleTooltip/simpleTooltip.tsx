import cn from "classnames";

import { ISimpleTooltip } from "../../../types/common/ComponentsProps";

import styles from "./simpleTooltip.module.scss";

export const SimpleTooltip = ({ open, text, top, left, className }: ISimpleTooltip) => {
	return (
		<dialog open={open} className={cn(styles.simpleTooltip, className)} style={{ top, left }}>
			{text}
		</dialog>
	);
};
