import { IExpensesModals } from "../../../../types/common/ComponentsProps";

import styles from "./negativeBalance.module.scss";

export const NegativeBalanceModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} role="textbox" className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.negativeBalanceModalContainer}>
				<p className={styles.negativeBalanceModalContainer__title}>Баланс не может быть меньше нуля</p>
			</div>
		</dialog>
	);
};
