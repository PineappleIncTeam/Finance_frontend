import { IEditTransactionSuccess } from "../../../types/common/ComponentsProps";

import styles from "./editTransactionSuccess.module.scss";

export const EditTransactionSuccessModal = ({ open }: IEditTransactionSuccess) => {
	return (
		<dialog open={open} className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.amountChangeSuccessModalContainer}>
				<p className={styles.amountChangeSuccessModalContainer__title}>Сумма успешно изменена</p>
			</div>
		</dialog>
	);
};
