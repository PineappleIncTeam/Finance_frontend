import { IExpensesModals } from "../../../types/common/ComponentsProps";

import styles from "./amountChangeSuccess.module.scss";

export const AmountChangeSuccessModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.amountChangeSuccessModalContainer}>
				<p className={styles.amountChangeSuccessModalContainer__title}>Сумма успешно изменена</p>
			</div>
		</dialog>
	);
};
