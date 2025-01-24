import { Trigon } from "../../../assets/script/expenses/TrigonIcon";
import { ITooltip } from "../../../types/common/ComponentsProps";

import styles from "./expensesTooltip.module.scss";

export const ExpensesTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={styles.expensesTooltipWrap}>
			<div onMouseMove={(e) => e.stopPropagation()} role="textbox" className={styles.expensesTooltip}>
				<div className={styles.expensesTooltipContainer}>
					<p className={styles.expensesTooltipContainer__text}>Редактировать</p>
				</div>
				<Trigon classNames={styles.trigonIcon} />
			</div>
		</dialog>
	);
};
