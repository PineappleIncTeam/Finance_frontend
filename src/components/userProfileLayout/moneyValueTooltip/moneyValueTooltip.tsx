import { ITooltip } from "../../../types/common/ComponentsProps";

import { Trigon } from "../../../assets/script/expenses/TrigonIcon";

import styles from "./moneyValueTooltip.module.scss";

export const MoneyValueTooltip = ({ open }: ITooltip) => {
	return (
		<dialog open={open} className={styles.moneyValueTooltipWrap}>
			<div onMouseMove={(e) => e.stopPropagation()} role="textbox" className={styles.moneyValueTooltip}>
				<div className={styles.moneyValueTooltipContainer}>
					<p className={styles.moneyValueTooltipContainer__text}>Редактировать</p>
				</div>
				<Trigon classNames={styles.trigonIcon} />
			</div>
		</dialog>
	);
};
