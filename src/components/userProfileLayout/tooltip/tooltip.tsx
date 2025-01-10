import { Trigon } from "../../../assets/script/expenses/TrigonIcon";
import { ITooltip } from "../../../types/common/ComponentsProps";

import style from "./tooltip.module.scss";

export const Tooltip = ({ open, text }: ITooltip) => {
	return (
		<dialog open={open} className={style.tooltipWrap}>
			<div onMouseMove={(e) => e.stopPropagation()} role="textbox" className={style.tooltip}>
				<div className={style.tooltipContainer}>
					<p className={style.tooltipContainer__text}>{text}</p>
				</div>
				<Trigon classNames={style.trigonIcon} />
			</div>
		</dialog>
	);
};
