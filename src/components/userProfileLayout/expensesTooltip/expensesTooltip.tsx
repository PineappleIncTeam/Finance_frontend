import { Trigon } from "../../../assets/script/expenses/TrigonIcon";
import { ITooltip } from "../../../types/common/ComponentsProps";

import style from "./expensesTooltip.module.scss";

export const ExpensesTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={style.expensesTooltipWrap}>
			<div onMouseMove={(e) => e.stopPropagation()} role="textbox" className={style.expensesTooltip}>
				<div className={style.expensesTooltipContainer}>
					<p className={style.expensesTooltipContainer__text}>Редактировать</p>
				</div>
				<Trigon classNames={style.trigonIcon} />
			</div>
		</dialog>
	);
};
