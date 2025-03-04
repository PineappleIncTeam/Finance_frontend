import { IExpensesModals } from "../../../../types/common/ComponentsProps";

import styles from "./categoryDeleteSuccess.module.scss";

export const CategoryDeleteSuccessModal = ({ open }: IExpensesModals) => {
	return (
		<dialog open={open} role="textbox" className={styles.backgroundModal}>
			<div onClick={(e) => e.stopPropagation()} role="textbox" className={styles.categoryDeleteSuccessModalContainer}>
				<p className={styles.categoryDeleteSuccessModalTitle}>Категория успешно удалена</p>
			</div>
		</dialog>
	);
};
